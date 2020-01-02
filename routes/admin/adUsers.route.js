const express = require('express');
const userModel = require('../../models/admin/users.model');

const router = express.Router();

router.get('/',  async(req, res) => {  
  const rows = await userModel.all();
for (const i of rows)
{
  i.isBidder = (i.Permission ==0);
  i.isSeller = (i.Permission ==2);
}
    res.render('_admin/manageUser',{
      showMenuAdmin:true,
      active_user: true,
      user: rows,
      
      
      empty: rows.length === 0
    });

   
  })
  router.get('/edit/:id', async (req, res) => {
    const rows = await userModel.single(req.params.id);
    if (rows.length === 0) {
      throw new Error('Invalid user id');
    }
    res.render('_admin/editUser',{
      showMenuAdmin:true,
      active_user: true,
      user: rows[0]
    });
   
    
  })
  
  router.post('/patch', async (req, res) => {
    const result = await userModel.patch(req.body);
    res.redirect('/admin/users');
    console.log(result);
    
  })
  
  router.post('/del', async (req, res) => {
    const result = await userModel.del(req.body.id);
   
    res.redirect('/admin/users');
  })
  

  
 
  

   module.exports = router;
  

