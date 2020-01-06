const express = require('express');
const categoryModel = require('../../models/categories.model');
const productModel = require('../../models/product.model');
const userModel = require('../../models/user.model');
const multer  = require('multer');
const mkdirp = require('mkdirp')
var uplodedImages = [];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './public/imgs/'+req.params.id;

    mkdirp(dir, err => cb(err, dir))
  },
  filename: function (req, file, cb) {
    var newFileName = file.fieldname + '-' + Date.now();
    cb(null,newFileName);
    uplodedImages.push(newFileName);
  }
})  
 
var upload = multer({ storage})

const router = express.Router();

//Check xem nguoi ban du dieu kien de vo trang hay khong (totalProductNeedInf < 3)
router.get('/add_product', async (req, res) => {
  

  const seller = await userModel.single(req.session.authUser.id_user);
 

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

router.post('/add_product2',async (req, res) => {
  //req.session.authUser.id_user;
  let entity = {
    ten_SP: req.body.productName.toString()
  }
  const row =  await productModel.addStep1(entity,req.session.authUser.id_user);
  entity = {};
  entity = {
    id_DM:req.body.id,
    id_SP: row.insertId
  }
  const rowDmsp = await productModel.addDmsp(entity);
  res.render('_seller/information_productSeller',{layout:'seller_layout',id:entity.id_SP});
})

router.post('/post/:id', function (req, res){
  uplodedImages = [];
  upload.fields(fields)(req, res, async err => {
  if (err) { }
  let buyingNow = req.body.buyingNow;
  let checkAuto = 0;
  if (buyingNow === ''){
    buyingNow = null;
  }
  console.log(req.body);
  try {
    if (req.body.checkAuto === 'true'){
        checkAuto =  1;
        console.log(checkAuto);
      }
  } catch (error) {
  }
  
  let entity = {
    moTaSP: req.body.description.toString(),
    gia_KhoiDiem: req.body.firstPrice,
    buocGia: req.body.stepPrice,
    timeEnd: req.body.dateEnd,
    gia_MuaNgay: buyingNow,
    giaHan: checkAuto,
    tinhTrang: req.body.status.toString(),
    trongLuong: req.body.weightPro,
    boSungThongTin: 1
  }
  
  const row = await productModel.patch(entity,req.params.id);
 
  let rowLink;
  for (let temp = 0; temp < uplodedImages.length;temp++){
    entity = {
      id_sp: req.params.id,
      link_anh: uplodedImages[temp].toString()
    }
    rowLink = await productModel.addLinkAnh(entity);
  }

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
  
  const result = await productModel.sellingProduct(req.session.authUser.id_user);

  

  console.log(result);
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
    empty: result.length === 0,
    result
  });
 
})

module.exports = router;