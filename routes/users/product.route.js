const express = require('express');
const productModel = require('../../models/product.model');
const userModel = require('../../models/user.model');
const moment = require('moment');
const numeral = require('numeral');
const senMailModel = require('../../models/sendMail.model');
const router = express.Router();


router.get('/:id', async (req, res) => {
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
  let curUser = null;
  let noBanCurUser = null;
  let noHadFavourite = true;
  let isCurMaxAuto = false;
  let maxAuto = -1;
  try {
    if (req.session.authUser.id_user !== undefined && req.session.authUser.id_user !== null) {
      checkLogin = true;
      curUser = req.session.authUser;
      if (req.session.authUser.id_user == rows[0].nguoiBan) {
        res.redirect('/seller/product/' + req.params.id);
        return;
      }
      [noBanCurUser,getHadFavourite,curMaxBidAuto] = await Promise.all([
        productModel.isBanCurUser(req.session.authUser.id_user, req.params.id),
        userModel.getHadFavorite(req.session.authUser.id_user,req.params.id),
        productModel.getCurMaxBidAuto(req.params.id)
      ]);
     
      if (getHadFavourite.length > 0)
      {
        noHadFavourite = false;
      }
      if (curMaxBidAuto.length > 0 && curMaxBidAuto[0].id_NM === req.session.authUser.id_user && curMaxBidAuto[0].gia_ToiDa >= rows[0].gia_HienTai )
      {
        maxAuto = +curMaxBidAuto[0].gia_ToiDa;
        isCurMaxAuto = true;
      }

    }
  } catch (error) {
    console.log(error);
  }

  //Kiểm tra xem người này có bị cấm không
  if (noBanCurUser == null || noBanCurUser.length == 0) {
    noBanCurUser = true;
  }
  else {
    noBanCurUser = false;
  }

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

  let curUserIsBidder = false;
  try {
    if (BidderPrice[0].id_user === curUser.id_user )
    {
      curUserIsBidder = true;
    }
  } catch (error) {
    console.log(error);
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
  { 
    canSell = false;
  }
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
  res.render('_product/product', {
    curUserIsBidder,
    noHadFavourite,
    curUser,
    noBanCurUser,
    BidderPrice: BidderPrice[0],
    AllDetailPrice,
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
    maxAuto,
    isCurMaxAuto
  });
})

//Đấu giá
router.post('/:id', async (req, res) => {
  let curUser = null;
  const product = await productModel.single(req.params.id);
  try {
    if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null) {
      throw new Error('Wanted');
    }
    curUser = await userModel.single(req.session.authUser.id_user);
    if (curUser.diem_DG < 80 && product[0].allBuy === 0) {
      throw new Error('Wanted');
    }

  } catch (error) {
    throw new Error('Wanted');
  }

  let noBanCurUser = await productModel.isBanCurUser(req.session.authUser.id_user, req.params.id);
  if (noBanCurUser.length != 0)
  {
    throw new Error('This guy is banned');
  }

  
  if (req.session.authUser.id_user === product[0].nguoiBan) {
    throw new Error('bidder is the Seller');
  }

  //Lấy người bán và sản phẩm có giá cao nhất
  const [sellerPro, curMaxBidAuto]= await Promise.all([ 
    userModel.single(product[0].nguoiBan),
    productModel.getCurMaxBidAuto(req.params.id)
  ]);

  let timeEnd = product[0].timeEnd;
  if (product[0].giaHan === 1) {
    const now = new Date().getTime();
    const timeEndProduct = new Date(timeEnd).getTime();
    if ((timeEndProduct - now) < 300 * 1000) {
      timeEnd = moment(new Date(timeEndProduct + 300000)).format('YYYY-MM-DD HH:mm:ss').toString();
    }
  }
  delete req.body.primaryAuto;
  req.body.timeEnd = timeEnd;

  //Lấy người đấu giá tự động cao nhất
 
  if (curMaxBidAuto.length > 0)
  {
    //Nếu người cho giá auto cao nhất hiện tại bé hơn giá hiện tại 
    //thì người mới thêm giá vào sẽ là người giữ giá cao nhất
    if (curMaxBidAuto[0].gia_ToiDa >= req.body.gia_HienTai)
    {
      req.body.nguoiGiuGia = curMaxBidAuto[0].id_NM;  
    }
    else {
      //req.body.gia_HienTai = req.body.gia_HienTai
      req.body.nguoiGiuGia = req.session.authUser.id_user;
    }
  }
  else {
    req.body.nguoiGiuGia = req.session.authUser.id_user;
  }
  const NewBidder = await userModel.single(req.body.nguoiGiuGia);
  const [rows, addPriceTable, sendMail] = await Promise.all([
    productModel.patch(req.body, req.params.id),
    productModel.addPriceTable(req.body.gia_HienTai, req.params.id, req.body.nguoiGiuGia),
    senMailModel.sendBid(NewBidder,sellerPro,product[0].ten_SP,req.body.gia_HienTai)
  ]);

  if (product[0].nguoiGiuGia !== null && req.body.nguoiGiuGia !== product[0].nguoiGiuGia)
  {
    const person = await userModel.single(product[0].nguoiGiuGia)
    const sendMailSigle = await senMailModel.sendMailSigle(person,product[0].ten_SP);
  }

  if (rows.length === 0 || addPriceTable.length === 0) {
    throw new Error('error occured');
  }
  res.redirect(req.params.id);
})

//Đấu giá tự đông
router.post('/:id/auto', async (req, res) => {
  let curUser = null;
  const product = await productModel.single(req.params.id);
  try {
    if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null) {
      throw new Error('Wanted');
    }
    curUser = await userModel.single(req.session.authUser.id_user);
    if (curUser.diem_DG < 80 && product[0].allBuy === 0) {
      throw new Error('Wanted');
    }

  } catch (error) {
    throw new Error('Wanted');
  }

  let noBanCurUser = await productModel.isBanCurUser(req.session.authUser.id_user, req.params.id);
  if (noBanCurUser.length != 0)
  {
    throw new Error('This guy is banned');
  }

  
  if (req.session.authUser.id_user === product[0].nguoiBan) {
    throw new Error('bidder is the Seller');
  }
  const [sellerPro, curMaxBidAuto]= await Promise.all([ 
    userModel.single(product[0].nguoiBan),
    productModel.getCurMaxBidAuto(req.params.id)
  ]);

  let timeEnd = product[0].timeEnd;
  if (product[0].giaHan === 1) {
    const now = new Date().getTime();
    const timeEndProduct = new Date(timeEnd).getTime();
    if ((timeEndProduct - now) < 300 * 1000) {
      timeEnd = moment(new Date(timeEndProduct + 300000)).format('YYYY-MM-DD HH:mm:ss').toString();
    }
  }

  
  
  //Đẩy giá tự động của người này lên db
  const upPriceAuto = await productModel.updatePriceAuto({id_sp:req.params.id,id_NM:req.session.authUser.id_user,gia_ToiDa:+req.body.primaryAuto});
 
  req.body.timeEnd = timeEnd;
  //Neu nguoi hien tai dang la nguoi giu gia => nguoi nay se co gia cao hon nhung nguoi dang co auto dau gia
  if (req.session.authUser.id_user === product[0].nguoiGiuGia)
  {
      res.redirect('../'+req.params.id);
      return;
  }

  //Neu co co nguoi co auto dau gia
  if (curMaxBidAuto.length > 0)
  {
    //Nếu người cho giá auto cao nhất hiện tại bé hơn giá hiện tại 
    //thì người mới thêm giá vào sẽ là người giữ giá cao nhất
    if(curMaxBidAuto[0].id_NM === req.session.authUser.id_user)
    {
      res.redirect('../'+req.params.id);
      return;
    } 

    //Nếu người có giá auto cao nhất thấp hơn giá hiện tại
    if (curMaxBidAuto[0].gia_ToiDa < product[0].gia_HienTai)
    {
      //Thì người giữ giá sẽ là người hiện tại cộng với step vừa đủ đấu giá
      req.body.gia_HienTai = +product[0].gia_HienTai + +product[0].buocGia;
      req.body.nguoiGiuGia = req.session.authUser.id_user;
    }
    else {
      //Ngược lại kiểm tra xem người đó có giá cao hơn người hiện tại ra giá không
        if (curMaxBidAuto[0].gia_ToiDa >= req.body.primaryAuto)
        {
          //Nếu có thì tiếp tục nắm giữ giá và tăng giá lên
          req.body.gia_HienTai = req.body.primaryAuto;
          req.body.nguoiGiuGia = curMaxBidAuto[0].id_NM;
        }
        else {
          //Ngược lại thì người gửi giá sẽ là người giữ giá tối đa của người kia + step
          req.body.gia_HienTai = +curMaxBidAuto[0].gia_ToiDa + +product[0].buocGia;
          req.body.nguoiGiuGia = req.session.authUser.id_user;
        }
    }
  }
  else {
    //Nếu không có người ra giá auto thì update lên
      req.body.gia_HienTai = +product[0].gia_HienTai + +product[0].buocGia;
      req.body.nguoiGiuGia = req.session.authUser.id_user;
  }
  delete req.body.primaryAuto;
 
  const NewBidder = await userModel.single(req.body.nguoiGiuGia);
  const [rows, addPriceTable, sendMail] = await Promise.all([
    productModel.patch(req.body, req.params.id),
    productModel.addPriceTable(req.body.gia_HienTai, req.params.id, req.body.nguoiGiuGia),
    senMailModel.sendBid(NewBidder,sellerPro,product[0].ten_SP,req.body.gia_HienTai)
  ]);

  if (product[0].nguoiGiuGia !== null && req.body.nguoiGiuGia !== product[0].nguoiGiuGia)
  {
    const person = await userModel.single(product[0].nguoiGiuGia)
    const sendMailSigle = await senMailModel.sendMailSigle(person,product[0].ten_SP);
  }

  if (rows.length === 0 || addPriceTable.length === 0) {
    throw new Error('error occured');
  } 
  res.redirect('../'+req.params.id);
})


//Mua ngay
router.post('/:id/buyNow', async (req, res) => {
  let curUser = null;
  const product = await productModel.single(req.params.id);
  try {
    if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null) {
      throw new Error('Wanted');
    }
    curUser = await userModel.single(req.session.authUser.id_user);
    if (curUser.diem_DG < 80 && product[0].allBuy === 0) {
      throw new Error('Wanted');
    }

  } catch (error) {
    throw new Error('Wanted');
  }

  let noBanCurUser = await productModel.isBanCurUser(req.session.authUser.id_user, req.params.id);
  //console.log(noBanCurUser);
  if (noBanCurUser.length != 0)
  {
    throw new Error('This guy is banned');
  }
  console.log(product);
  const sellerPro = await userModel.single(product[0].nguoiBan);
  const [rows,sendMailBuyNow,AllDetailPrice] = await Promise.all([
    productModel.patch(req.body,req.params.id),
    senMailModel.sendBuyNow(req.session.authUser,sellerPro,product[0].ten_SP,product[0].gia_MuaNgay),
    productModel.getAllDetail(req.params.id)
  ]);
  
  if (AllDetailPrice.length > 0)
  {
    let haveSend = [];
    for (const child of AllDetailPrice){
      if (child.id_user !== req.session.authUser.id_user &&  haveSend.indexOf(child.id_user) === -1)
      {
       haveSend.push(child.id_user);
       console.log(haveSend);
       const check = await senMailModel.sendMailEnd(child,product[0].ten_SP);
      }
    }
  }
  
  if (rows.length===0)
  {
    throw new Error('Mua ngay thất bại');
  }
  res.redirect('../'+req.params.id);
})

router.post('/:id/addFavourite', async (req, res) => {

  try {
    if (req.session.authUser.id_user == undefined || req.session.authUser.id_user == null) {
      throw new Error('Wanted');
    }
    curUser = await userModel.single(req.session.authUser.id_user);

  } catch (error) {
    throw new Error('Wanted');
  }

  let noBanCurUser = await productModel.isBanCurUser(req.session.authUser.id_user, req.params.id);
  if (noBanCurUser.length != 0)
  {
    throw new Error('This guy is banned');
  }

  const rows = await userModel.addFavourite(req.body);
  if (rows.length===0)
  {
    throw new Error('Thêm sản phẩm yêu thích bị lỗi');
  }

  res.redirect('../'+req.params.id);
})



router.get('/err', (req, res) => {

  throw new Error('error occured');
})

module.exports = router;