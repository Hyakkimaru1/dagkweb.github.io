const express = require('express');
const productModel = require('../../models/product.model');
const userModel = require('../../models/user.model');
const moment = require('moment');
const numeral = require('numeral');
const router = express.Router();


router.get('/:id', async (req, res) => {
  const [rows,linkImg] = await Promise.all([
    productModel.single(req.params.id),
    productModel.getLinkImg(req.params.id)
  ]);
  
  //if product is not providding info product
  if (rows[0].boSungThongTin === 0){
    //error
    throw new Error('error occured');
  }

  let checkLogin = false;

  try {
    if ( req.session.authUser.id_user != undefined && req.session.authUser.id_user != null)
    {
        checkLogin = true;
    }
  } catch (error) {

  }
  //get link img
  let imgsource = [];
  for (let c of linkImg)
  {
    imgsource.push("/imgs/"+req.params.id+"/"+c.link_anh);
  }
  //get Main picture
  const MainPic = imgsource[0]; 

  //seller, chi tiet cac luot ra gia,Bidder giu gia cao nhat, chi tiet danh gia seller, tong luot danh gia
  const [Seller,AllDetailPrice,BidderPrice,detailRateSeller,totalRatingSeller] = await Promise.all([
    userModel.single(rows[0].nguoiBan),
    productModel.getAllDetail(req.params.id),
    productModel.getBidderPrice(req.params.id),
    userModel.getDetailRating(rows[0].nguoiBan),
    userModel.getTotalRating(rows[0].nguoiBan)
  ]);
 
  let curUser = null;
  if (checkLogin){
    curUser = await userModel.single(req.session.authUser.id_user);
  }

  //check time End 
  let timeEnd = new Date(rows[0].timeEnd).getTime();
  let now = new Date().getTime();
  let check = true;
  if (timeEnd - now > 0) {
    cheack = true;
  }
  else {
    check = false;
  }
  const timeCreate = moment(rows[0].timeCreate).format('HH:mm:ss DD-MM-YYYY').toString();
  const timeCreateSeller = moment(Seller.timeCreateSeller).format('HH:mm:ss DD-MM-YYYY').toString();
  //check can buy now
  let gia_MuaNgay = +rows[0].gia_MuaNgay;
  let check_MuaNgay;
  if (gia_MuaNgay > 0) {
    check_MuaNgay = true;
  }
  else {
    check_MuaNgay = false;
  }

  //check can shell
  let canSell = true;
  if (rows[0].nguoiThang != null)
      canSold = false;
  let minium_Bid = +rows[0].gia_HienTai + +rows[0].buocGia;
 
  //mask all name in view
  BidderPrice[0].usernameMask = BidderPrice[0].username.substr(BidderPrice[0].username.length - 3);
  Seller.usernameMask = Seller.username.substr(Seller.username.length-3);
  for (const c of AllDetailPrice){
    c.usernameMask = c.username.substr(c.username.length-3);
    c.timePriced = moment(c.timeCreate).format('HH:mm:ss DD-MM-YYYY').toString();
    c.Money = numeral(c.gia).format('0,0');
  }
  res.render('_product/product', {
    BidderPrice: BidderPrice[0],
    AllDetailPrice,
    detailRateSeller,
    totalRatingSeller: totalRatingSeller[0].diem_DG,
    checkLogin,
    timeCreate,
    timeCreateSeller,
    rows:rows[0],
    imgsource,
    Seller,
    minium_Bid,
    check_MuaNgay,
    check,
    canSell,
    MainPic
  });
})

router.post('/:id', async (req, res) => {
  try {
    if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
    {
      throw new Error('Wanted');
    }
    curUser = await userModel.single(req.session.authUser.id_user);
    if (curUser.diem_DG < 80)
    {
      throw new Error('Wanted');
    }
    
  } catch (error) {
    throw new Error('Wanted');
  }
  
  const product = await productModel.single(req.params.id);
  let timeEnd = product[0].timeEnd;
  if (product[0].giaHan === 1)
  {
    const now = new Date().getTime();
    const timeEndProduct = new Date(timeEnd).getTime();
    if ((timeEndProduct - now) < 300*1000)
    { 
      timeEnd = moment(new Date(timeEndProduct+300000)).format('YYYY-MM-DD HH:mm:ss').toString();
    }
  }

  req.body.timeEnd = timeEnd;
  const [rows,addPriceTable] = await Promise.all([ 
    productModel.patch(req.body,req.params.id),
    productModel.addPriceTable(req.body.gia_HienTai,req.params.id,curUser.id_user)
  ]);
 
  if (rows.length === 0 || addPriceTable.length === 0) {
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