const express = require('express');
const categoryModel = require('../../models/categories.model');
const productModel = require('../../models/product.model');
const userModel = require('../../models/user.model');
const multer  = require('multer');
const mkdirp = require('mkdirp');
const moment = require('moment');
const senMailModel = require('../../models/sendMail.model');
const numeral = require('numeral');
var uplodedImages = [];
var temp = 0;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './public/imgs/'+req.params.id;

    mkdirp(dir, err => cb(err, dir))
  },
  filename: function (req, file, cb) {
    var newFileName = file.fieldname + temp + '-' + Date.now();
    cb(null,newFileName);
    temp++;
    uplodedImages.push(newFileName);
  }
})  
 
var upload = multer({ storage})

const router = express.Router();

//Check xem nguoi ban du dieu kien de vo trang hay khong (totalProductNeedInf < 3)
router.get('/add_product', async (req, res) => {
  
  if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
  {
    throw new Error('Seller muốn thêm sản phẩm nhưng không đăng nhập');
  }
  if (req.session.authUser.Permission < 1)
  {
    throw new Error('Người dùng chưa đủ điều kiện thêm sản phẩm');
  }

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
  if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
  {
    throw new Error('Seller muốn update');
  }
  
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
  temp=0;
  uplodedImages = [];
  upload.fields(fields)(req, res, async err => {
  if (err) { }
  let buyingNow = req.body.buyingNow;
  let checkAuto = 0;
  if (buyingNow === ''){
    buyingNow = null;
  }
  try {
    if (req.body.checkAuto === 'true'){
        checkAuto =  1;
      }
  } catch (error) {
  }
  try {
    if (req.body.allBuy === 'true'){
      req.body.allBuy =  1;
    }
    else {
      req.body.allBuy =  0;
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
    gia_HienTai: req.body.firstPrice,
    tinhTrang: req.body.status.toString(),
    trongLuong: req.body.weightPro,
    boSungThongTin: 1,
    allBuy: req.body.allBuy
  }
  
  const row = await productModel.patch(entity,req.params.id);
 
  let Max = uplodedImages.length;
  const checkHadImg = await productModel.getTotalImg(req.params.id);
  if (checkHadImg.length + uplodedImages.length > 8)
  {
    Max = Math.abs(8 - checkHadImg.length);
  }

  let rowLink;
  for (let temp = 0; temp < Max;temp++){
    entity = {
      id_sp: req.params.id,
      link_anh: uplodedImages[temp].toString()
    }
    rowLink = await productModel.addLinkAnh(entity);
  } 

  res.redirect('../my_product');
  });
})

router.get('/product/:id',async (req,res) => {
  if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
  {
    throw new Error('Người dùng muốn đăng nhập lậu');
  }

  const product = await productModel.single(req.params.id);
  if (product[0].nguoiBan !== req.session.authUser.id_user)
  {
    throw new Error('Not person who sold');
  }
  const [rows, linkImg] = await Promise.all([
    productModel.single(req.params.id),
    productModel.getLinkImg(req.params.id)
  ]);

  //if product is not providding info product
  if (rows[0].boSungThongTin === 0) {
    //error
    throw new Error('error occured');
  }

  let checkLogin = false;


  //get link img
  let imgsource = [];
  for (let c of linkImg) {
    imgsource.push("/imgs/" + req.params.id + "/" + c.link_anh);
  }
  //get Main picture
  const MainPic = imgsource[0];

  //seller, chi tiet cac luot ra gia,Bidder giu gia cao nhat, chi tiet danh gia seller, tong luot danh gia
  const [Seller, AllDetailPrice, BidderPrice, detailRateSeller, totalRatingSeller] = await Promise.all([
    userModel.single(rows[0].nguoiBan),
    productModel.getAllDetail(req.params.id),
    productModel.getBidderPrice(req.params.id),
    userModel.getDetailRating(rows[0].nguoiBan),
    userModel.getTotalRating(rows[0].nguoiBan)
  ]);

  //lấy review của những người ra giá
  for (const bid of AllDetailPrice)
  {
    bid.allReview = await userModel.getFeedback(bid.id_NM);
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
  if (BidderPrice.length > 0)
  {
    BidderPrice[0].usernameMask = BidderPrice[0].username.substr(BidderPrice[0].username.length - 3);
  }
  
  Seller.usernameMask = Seller.username.substr(Seller.username.length - 3);
  for (const c of AllDetailPrice) {
    c.usernameMask = c.username.substr(c.username.length - 3);
    c.timePriced = moment(c.timeCreate).format('HH:mm:ss DD-MM-YYYY').toString();
    c.Money = numeral(c.gia).format('0,0');
  }

  res.render('_seller/productViewSeller', {
    BidderPrice: BidderPrice[0],
    AllDetailPrice,
    AllDetailPriceBest:  AllDetailPrice[0] ,
    detailRateSeller,
    totalRatingSeller: totalRatingSeller[0].diem_DG,
    checkLogin,
    timeCreate,
    timeCreateSeller,
    rows: rows[0],
    imgsource,
    Seller,
    minium_Bid,
    check_MuaNgay,
    check,
    canSell,
    MainPic,
    layout:'seller_layout'
  });
})

router.post('/product/:id', async(req,res)=>{
  if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
  {
    throw new Error('Người dùng muốn đăng nhập lậu');
  }

  const product = await productModel.single(req.params.id);
  if (product[0].nguoiBan !== req.session.authUser.id_user)
  {
    throw new Error('Not person who sold');
  }
  try {
    if (req.body.id_NM == undefined || req.body.id_NM == null)
    {
      const row = await productModel.patch(req.body,req.params.id);
    }
    else{
      const BestBidder = await productModel.getBidderPrice(req.params.id);
      const row = await productModel.delBidder(req.body);
      const banPer = {
        id_sp: req.body.id_SP,
        id_NM: req.body.id_NM
      }
      const BanPerson = await userModel.addBan(banPer);

      if (BanPerson.length === 0)
      {
        throw new Error('Cannot ban this person');
      }

      //update người giữ giá cao nhất
      if (req.body.id_NM == BestBidder[0].id_user)
      {
        const BestBidderNew = await productModel.getBidderPrice(req.params.id);
        //Fail
        const entity = {
          gia_HienTai : BestBidderNew[0].gia,
          nguoiGiuGia : BestBidderNew[0].id_user,
        }
        const updateProduct = await productModel.patch(entity,req.params.id);
      }
      const Bidder = await userModel.single(req.body.id_NM);
      try {
        const sendMailDeny = await senMailModel.sendMailDeny(Bidder,product[0].ten_SP);
      } catch (error) {
        console.log(error);
      }
    }
    
  } catch (error) {
    throw new Error(error);
  }
  
  res.redirect(req.params.id);
})



router.get('/err', (req, res) => {

  throw new Error('error occured');

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
  for (const child of result)
  {
    if(child.boSungThongTin === 0)
    {
      child.boSung = false;
    }
    else {
      child.boSung = true;
    }
  }

  res.render('_seller/sellingProduct',{
    layout:'seller_layout',
    showMenuSeller:true,
    my_product: true,
    result
  
  });
})

router.post('/update/:id',(req,res) => {

  res.render('_seller/information_productSeller',{layout:'seller_layout',id:req.params.id});
})

router.post('/edit/:id',async (req,res) => {
  if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null)
  {
    throw new Error('Người dùng muốn đăng nhập lậu');
  }

  const product = await productModel.single(req.params.id);
  if (product[0].nguoiBan !== req.session.authUser.id_user)
  {
    throw new Error('Not person who sold');
  }
  const [rows, linkImg] = await Promise.all([
    productModel.single(req.params.id),
    productModel.getLinkImg(req.params.id)
  ]);

  //if product is not providding info product
  if (rows[0].boSungThongTin === 0) {
    //error
    throw new Error('error occured');
  }

  //get link img
  let imgsource = [];
  for (let c of linkImg) {
    imgsource.push("/imgs/" + req.params.id + "/" + c.link_anh);
  }

  for (let temp = imgsource.length; temp < 8; temp++)
  {
    imgsource[temp] = ""
  }
  //get Main picture
  res.render('_seller/update_information',{layout:'seller_layout',
  rows: rows[0],
  PicMain: imgsource[0],
  Pic2: imgsource[1],
  Pic3: imgsource[2],
  Pic4: imgsource[3],
  Pic5: imgsource[4],
  Pic6: imgsource[5],
  Pic7: imgsource[6],
  Pic8: imgsource[7],
  });
})

router.post('/edit2/:id', function (req, res){
  uplodedImages = [];
  upload.fields(fields)(req, res, async err => {
  if (err) { }
  let buyingNow = req.body.buyingNow;
  let checkAuto = 0;
  if (buyingNow === ''){
    buyingNow = null;
  }
  try {
    if (req.body.checkAuto === 'true'){
        checkAuto =  1;
      }
  } catch (error) {
  }
  let entity = {
    gia_KhoiDiem: req.body.firstPrice,
    buocGia: req.body.stepPrice,
    timeEnd: req.body.dateEnd,
    gia_MuaNgay: buyingNow,
    giaHan: checkAuto,
    gia_HienTai: req.body.firstPrice,
    tinhTrang: req.body.status.toString(),
    trongLuong: req.body.weightPro,
    boSungThongTin: 1
  }
  
  const row = await productModel.patch(entity,req.params.id);

  let Max = uplodedImages.length;
  const checkHadImg = await productModel.getTotalImg(req.params.id);
  if (checkHadImg.length + uplodedImages.length > 8)
  {
    Max = Math.abs(8 - checkHadImg.length);
  }

  let rowLink;
  for (let temp = 0; temp < Max;temp++){
    entity = {
      id_sp: req.params.id,
      link_anh: uplodedImages[temp].toString()
    }
    rowLink = await productModel.addLinkAnh(entity);
  } 
  res.redirect('../my_product');
  });
})


router.get('/sold', async (req, res) => {
  const result = await productModel.soldProduct(req.session.authUser.id_user);
  
  
  for(let row of result){
    if(row.nguoiThang === null){
      row.nguoiCanDG = row.nguoiGiuGia;
      
    }
    else{
      row.nguoiCanDG = row.nguoiThang;
    }
  }
  res.render('_seller/soldProduct',{
    layout:'seller_layout',
    showMenuSeller:true,
    sold: true,
    empty: result.length === 0,
    result
  });
 
})

router.post('/soldPro-fb', async (req, res) => {
  console.log(req.query);
  console.log(req.body);

  const row = await userModel.selectID_DG(req.query.idSP,req.session.authUser.id_user);
  console.log(row);
  //neu nhu chua danh gia thi thuc hien danh gia
  if(row === null){
    const entity = {};
    entity.id_nguoi_DG = req.session.authUser.id_user;
    entity.id_nguoi_duoc_DG = req.query.idBidder;
    entity.id_sp_duoc_dg = req.query.idSP;
    entity.nhan_xet_DG = req.body.feedback;
    entity.diem_DG = +req.body.point;
    entity.timeCreate = moment().format('YYYY/MM/DD HH:mm:ss');
    console.log(entity);
    const dg = await userModel.addDG(entity);
    console.log(dg);

    //cap nhat lai diem danh gia trong bang nguoidung
    const totalRating = await userModel.getTotalRating(entity.id_nguoi_duoc_DG);
    const NumberOfRating = totalRating[0].total;
    const detailOfRating = await userModel.getDetailRating(entity.id_nguoi_duoc_DG);
    let diem_dg_moi = 0;
    for(const rate of detailOfRating){
      diem_dg_moi += rate.diem_DG;
    }
    const obj = {};
    obj.id_user = entity.id_nguoi_duoc_DG;
    obj.diem_DG = 100*diem_dg_moi/NumberOfRating;
    const rs = await userModel.patch(obj);
  }
  else {//neu da co danh gia thi sua lai danh gia
    const obj1 = {};
    obj1.id_DG = row.id_DG;
    obj1.diem_DG = +req.body.point;

    const obj2 ={};
    obj2.id_DG = row.id_DG;
    obj2.nhan_xet_DG = req.body.feedback;

    const [rs1,rs2] = await Promise.all([
      userModel.patch_dg(obj1),//sua lai diem
      userModel.patch_dg(obj2) //sua lai noi dung danh gia
    ]);

    //cap nhat lai diem danh gia
    const totalRating = await userModel.getTotalRating(req.query.idBidder);
    const NumberOfRating = totalRating[0].total;
    console.log(NumberOfRating);
    const detailOfRating = await userModel.getDetailRating(req.query.idBidder);
    let diem_dg_moi = 0;
    for(const rate of detailOfRating){
      diem_dg_moi += rate.diem_DG;
    }
    const obj3 = {};
    obj3.id_user = req.query.idBidder;
    obj3.diem_DG = 100*diem_dg_moi/NumberOfRating;
    const rs = await userModel.patch(obj3);

  }
  res.redirect('/seller/sold');
});

router.get('/delSoldPro',async (req,res) =>{
  //đổi isPay của sản phẩm
  let entity_del = req.query;
  delete entity_del.idBidder;
  entity_del.isPay = 0;
  const rs = await productModel.patchIsPay(entity_del);

  //đánh giá bidder không trả tiền
  const feedback = 'Người thắng không thanh toán';
  const diem_DG = -1;

  const row = await userModel.selectID_DG(req.query.idSP,req.session.authUser.id_user);
  //console.log(row);
  //neu nhu chua danh gia thi thuc hien danh gia
  if(row === null){
    const entity = {};
    entity.id_nguoi_DG = req.session.authUser.id_user;
    entity.id_nguoi_duoc_DG = req.query.idBidder;
    entity.id_sp_duoc_dg = req.query.idSP;
    entity.nhan_xet_DG = feedback;
    entity.diem_DG = diem_DG;
    entity.timeCreate = moment().format('YYYY/MM/DD HH:mm:ss');
    console.log(entity);
    const dg = await userModel.addDG(entity);
    console.log(dg);

    //cap nhat lai diem danh gia trong bang nguoidung
    const totalRating = await userModel.getTotalRating(entity.id_nguoi_duoc_DG);
    const NumberOfRating = totalRating[0].total;
    const detailOfRating = await userModel.getDetailRating(entity.id_nguoi_duoc_DG);
    let diem_dg_moi = 0;
    for(const rate of detailOfRating){
      diem_dg_moi += rate.diem_DG;
    }
    const obj = {};
    obj.id_user = entity.id_nguoi_duoc_DG;
    let Newpoint = 100*diem_dg_moi;
    if(Newpoint < 0){
      Newpoint = 0;
    }
    obj.diem_DG = Newpoint/NumberOfRating;
    const rs = await userModel.patch(obj);
  }
  else {//neu da co danh gia thi sua lai danh gia
    const obj1 = {};
    obj1.id_DG = row.id_DG;
    obj1.diem_DG = diem_DG;

    const obj2 ={};
    obj2.id_DG = row.id_DG;
    obj2.nhan_xet_DG = feedback;

    const [rs1,rs2] = await Promise.all([
      userModel.patch_dg(obj1),//sua lai diem
      userModel.patch_dg(obj2) //sua lai noi dung danh gia
    ]);

    //cap nhat lai diem danh gia
    const totalRating = await userModel.getTotalRating(req.query.idBidder);
    const NumberOfRating = totalRating[0].total;
    console.log(NumberOfRating);
    const detailOfRating = await userModel.getDetailRating(req.query.idBidder);
    let diem_dg_moi = 0;
    for(const rate of detailOfRating){
      diem_dg_moi += rate.diem_DG;
    }
    const obj3 = {};
    obj3.id_user = req.query.idBidder;
    let Newpoint = 100*diem_dg_moi;
    if(Newpoint < 0){
      Newpoint = 0;
    }
    obj3.diem_DG = Newpoint/NumberOfRating;
    const rs = await userModel.patch(obj3);

  }
  res.redirect('/seller/sold');

});
module.exports = router;