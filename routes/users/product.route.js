const express = require('express');
const productModel = require('../../models/product.model');

const router = express.Router();

router.get('/all', async (req, res) => {

  const rows = await productModel.all();
  console.log(rows);

  // let time = rows[0].timeEnd;
  var now = new Date().getTime();
  var check = true;
  if (1578069800000 - now > 0) {
    cheack = true;
  }
  else {
    check = false;
  }
  var gia_MuaNgay = 6969;
  var check_MuaNgay;
  if (gia_MuaNgay > 0) {
    check_MuaNgay = true;
  }
  else {
    check_MuaNgay = false;
  }
  //var minium_Bid = gia_HienTai + buocGia;
  res.render('_product/product', {
    id: 1, ten_SP: 'Mint - in undamaged sealed original box',
    usename_Seller: 'Duy',
    username_Bidder: 'Duy Nek',
    timeEnd: '1578069800000',
    gia_HienTai: '666',
    diem_DG_Seller: '99',
    diem_DG_Bidder: '100',
    moTaSP: 'Set from 2010 Sealed, mint. One small price tag on front',
    timeCreate: 'January 18, 2015',
    all_riviews_Seller: '100',
    minium_Bid: '777',
    gia_MuaNgay,
    check_MuaNgay,
    check
  });

  // } catch (err) {
  //   console.log(err);
  //   res.end('View error log in console.');
  // }


  // db.load('select * from categories', rows => {
  //   res.render('vwCategories/index', {
  //     categories: rows,
  //     empty: rows.length === 0
  //   });
  // });
})


router.get('/:id', async (req, res) => {
  const rows = await productModel.single(req.params.id);
  let timeEnd = new Date(rows[0].timeEnd).getTime();
  let now = new Date().getTime();
  let check = true;
  if (timeEnd - now > 0) {
    cheack = true;
  }
  else {
    check = false;
  }
  let gia_MuaNgay = +rows[0].gia_MuaNgay;
  let check_MuaNgay;
  if (gia_MuaNgay > 0) {
    check_MuaNgay = true;
  }
  else {
    check_MuaNgay = false;
  }
  let canSell = true;
  if (rows[0].nguoiThang != null)
      canSold = false;
  let minium_Bid = +rows[0].gia_HienTai + +rows[0].buocGia;
  res.render('_product/product', {
    rows :rows[0],
    usename_Seller: 'Duy',
    username_Bidder: 'Duy',
    diem_DG_Seller: '99',
    diem_DG_Bidder: '100',
    all_riviews_Seller: '8',
    minium_Bid,
    check_MuaNgay,
    check,
    canSell
  });
})

router.post('/:id', async (req, res) => {

  console.log(req.body);
  const rows = await productModel.patch(req.body,req.params.id);
  if (rows.length === 0) {
    throw new Error('error occured');
  }
  res.redirect(req.params.id);
})

router.post('/:id/buyNow', (req, res) => {
  console.log(req.body);
})

router.post('/add', async (req, res) => {
  const result = await categoryModel.add(req.body);
  // console.log(result.insertId);
  res.render('vwCategories/add');
})

router.get('/err', (req, res) => {

  throw new Error('error occured');
})


module.exports = router;