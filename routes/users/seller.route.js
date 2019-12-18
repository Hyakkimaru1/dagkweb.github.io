const express = require('express');
//const categoryModel = require('../../models/category.model');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('_seller/information_productSeller',{layout:'seller_layout'});
})

router.post('/post', (req, res) => {
  res.render('_seller/post_productSeller',{layout:'seller_layout'});
})

router.get('/post', (req, res) => { 
  res.render('_seller/post_productSeller',{layout:'seller_layout'});
})

router.get('/post/post', (req, res) => { 
  res.render('_seller/post_productSeller',{layout:'seller_layout'});
})

router.post('/add', async (req, res) => {
  // console.log(req.body);
  // const entity = {
  //   CatName: req.body.txtCatName
  // }
  const result = await categoryModel.add(req.body);
  // console.log(result.insertId);
  res.render('vwCategories/add');
})

router.get('/err', (req, res) => {

  throw new Error('error occured');

  // try {
  //   throw new Error('error occured');
  // }
  // catch (err) {
  //   console.log(err.stack);
  //   res.send('View error on console');
  // }
})

router.get('/edit/:id', async (req, res) => {
  const rows = await categoryModel.single(req.params.id);
  if (rows.length === 0) {
    throw new Error('Invalid category id');
  }
  // const c = {
  //   CatID: req.params.id,
  //   CatName: 'unknown'
  // }
  res.render('vwCategories/edit', {
    category: rows[0]
  });
})

router.post('/patch', async (req, res) => {
  const result = await categoryModel.patch(req.body);
  res.redirect('/admin/categories');
})

router.post('/del', async (req, res) => {
  const result = await categoryModel.del(req.body.CatID);
  // console.log(result.affectedRows);
  res.redirect('/admin/categories');
})



module.exports = router;