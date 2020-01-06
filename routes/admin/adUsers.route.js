const express = require('express');
const userModel = require('../../models/admin/users.model');

const router = express.Router();

router.get('/',  async(req, res) => {  
  const rows = await userModel.all();
 
for (const i of rows)
{
  i.isBidder = (i.Permission == 0 && i.timeUpdateSeller == null);
  i.isSeller = (i.Permission ==1);
  i.isUp = (i.Permission ==0 && i.timeUpdateSeller != null);
  const now = new Date().getTime();
    const timeUpSeller = new Date(i.timeUpdateSeller).getTime();
    const enity={
      timeUpdateSeller:null,
      id_user:i.id_user
    };
    if (i.timeUpdateSeller!=null && ( now - timeUpSeller) >86400000*7)
    { 
     
      await userModel.patch(enity);
      res.redirect('/admin');
    }
  
  
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

  router.post('/up', async (req, res) => {
    req.body.timeCreateSeller = new Date();
    req.body.timeEndBidder = req.body.timeCreateSeller;
    console.log(req.body.timeCreateSeller);
    const result = await userModel.patch(req.body);
    res.redirect('/admin/users');
    console.log(result);
    
  })

  router.post('/down', async (req, res) => {
    req.body.timeEndSeller = new Date();
    req.body.timeUpdateSeller = null;
    console.log(req.body.timeCreateSeller);
    const result = await userModel.patch(req.body);
    res.redirect('/admin/users');
    console.log(result);
    
  })
  
  router.post('/del', async (req, res) => {
    const result = await userModel.del(req.body.id_user);
   
    res.redirect('/admin/users');
  })
  

  
 
  

   module.exports = router;
  

