const express = require('express');
const categoryModel = require('../../models/categories.model');
const productModel = require('../../models/product.model');
const multer  = require('multer');
const mkdirp = require('mkdirp');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './public/imgs/'+req.params.id

    mkdirp(dir, err => cb(err, dir))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})  
 
var upload = multer({ storage})

const router = express.Router();

router.get('/add_product', async (req, res) => {
  const rows = await categoryModel.allCategoryPapa();
  const rowsChild = await categoryModel.all();
  for (const i of rows){
      i.Child = [];
      for (const j of rowsChild)
      {
        if (i.id === j.id_DM_cha){
          i.Child.push(j);
        }
      }
  }
  res.render('_seller/post_productSeller',{rows,layout:'seller_layout'});
})



var fields = [
  {name: 'coverImg',maxCount: '1'},
  {name: 'img',maxCount:'7'}
];

router.post('/add_product2', (req, res) => {
  res.render('_seller/information_productSeller',{layout:'seller_layout'});
})

router.post('/post/:id',function (req, res){
  console.log(req);
  upload.fields(fields)(req, res, err => {
  console.log(req.body);
  if (err) { }
  res.send('ok');
  });
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


router.get('/my_product', async (req, res) => {
  console.log(req.session.authUser.id_user);
  const result = await productModel.sellingProduct(req.session.authUser.id_user);
  res.render('_seller/sellingProduct',{
    layout:'seller_layout',
    showMenuSeller:true,
    my_product: true,
    result
  
  });
 
})

router.get('/sold', async (req, res) => {
  const result = await productModel.soldProduct(req.session.authUser.id_user);
  res.render('_seller/soldProduct',{
    layout:'seller_layout',
    showMenuSeller:true,
    sold: true,
    result
  });
 
})

module.exports = router;