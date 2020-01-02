const express = require('express');
const productModel = require('../../models/admin/products.model');

const router = express.Router();



  router.get('/', async (req, res) => {
    const rows = await productModel.all();
   
    res.render('_admin/manageProduct',{
      showMenuAdmin:true,
      active_product: true,
      products: rows,
      empty: rows.length === 0
    });
  })

  router.get('/add', async (req, res) => {
    res.render('_admin/addProduct',{
      showMenuAdmin:true,
      active_product: true
    });
  })
router.post('/add', async(req,res) => {
  
  const result = await productModel.add(req.body);
 
  res.redirect('/admin/products');
});
 
router.get('/edit/:id', async (req, res) => {
  const rows = await productModel.single(req.params.id);
  if (rows.length === 0) {
    throw new Error('Invalid category id');
  }
  res.render('_admin/editProduct',{
    showMenuAdmin:true,
    active_product: true,
    products: rows[0]
  });
})

router.post('/patch', async (req, res) => {
  const result = await productModel.patch(req.body);
  
  
  res.redirect('/admin/products');
})

router.post('/del', async (req, res) => {
  const result = await productModel.del(req.body.id);
 
  res.redirect('/admin/products');
})

  

   module.exports = router;
  

