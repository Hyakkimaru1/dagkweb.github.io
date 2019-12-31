const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/user.model');
const moment = require('moment')

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('vwAccount/vwProfile/profile');
});

router.post('/profile', async (req, res) => {

  const update_entity = req.body;

  const user = await userModel.singleByEmail(req.body.email);
  if (!(user === null))
    return res.render('vwAccount/vwProfile/profile', {
      err_message: 'The new email is duplicate! You can use the another email.'
    });

  //them id vao entity
  update_entity.id_user = req.session.authUser.id_user;
  //console.log(update_entity);
  const result = await userModel.patch(update_entity);
  //console.log(result);

  //update lai firstname, lastname, addr, email trong authUser
  req.session.authUser.lastname = update_entity.lastname;
  req.session.authUser.firstname = update_entity.firstname;
  req.session.authUser.addr = update_entity.addr;
  req.session.authUser.email = update_entity.email;

  res.render('vwAccount/vwProfile/profile',{
    success_message: 'Your Information has been saved'
  });
  
});

router.get('/changepwd', (req, res) => {
  res.render('vwAccount/vwProfile/changePwd');
});

router.post('/changepwd', async (req, res) => {
  const entity = req.body;
  
  entity.id_user = req.session.authUser.id_user;
  //console.log(entity);
  const user = await userModel.single(entity.id_user);
  console.log(user.password);
  const rs = bcrypt.compareSync(entity.curpassword, user.password);
  if (rs === false)
    return res.render('vwAccount/vwProfile/changePwd', {
      err_message: 'The current password was wrong.'
    });

  //change password
  delete entity.curpassword;
  const N = 10;
  entity.password = bcrypt.hashSync(entity.newpassword, N);
  delete entity.newpassword;
  console.log(entity);
  
  const result = await userModel.patch(entity);
  res.render('vwAccount/vwProfile/changePwd', {
    success_message: 'Your password has been changed successfully!'
  });
});

router.get('/feedback', async (req, res) => {
  const rows = await userModel.getFeedback(req.session.authUser.id_user);
  if(rows.length > 0){
    //console.log(rows);
    for(const row of rows){
      row.diem_DG = row.diem_DG === 1;
      const user = await userModel.single(row.id_nguoi_duoc_DG);
      //console.log(user);
      row.maskName = user.username.replace(/\w(?=\w{3})/g, "*");
      delete row.id_nguoi_duoc_DG;
      //row.timeCreate = row.timeCreate.replace(/T/, ' ').replace(/\..+/,; '');
      row.timeCreate = moment(row.timeCreate).format('DD/MM/YYYY');
      delete row.id_nguoi_duoc_DG;
    }
  }
  console.log(rows);
  res.render('vwAccount/vwProfile/feedback',{
    feedback: rows,
    empty: rows.length === 0,
  });
});

router.get('/cartBidding', (req, res) => {
  res.render('vwAccount/vwProfile/cartBidding');
});

router.get('/successfulBid', async (req, res) => {
  const rows = await userModel.getWonlist(req.session.authUser.id_user);

  console.log(rows);
  if(rows.length > 0){
    for(const row of rows){
      console.log(row);
      const Seller = await userModel.single(row.nguoiBan);
      if(Seller !== null){
        row.nameSeller = Seller.firstname + " " + Seller.lastname;
        console.log(row);
      }
    }
  }
  res.render('vwAccount/vwProfile/successfulBid',{
    products: rows,
    empty: rows.length === 0,
  });
});

router.get('/wishlist', async (req, res) => {
  const rows = await userModel.getWishlist(req.session.authUser.id_user);
  if(rows.length > 0) {
    for(const row of rows){
      //tinh toan thoi gian con lai
      let seconds = moment(row.timeEnd).unix() - moment().unix();

      //kiem tra xem san pham con dau gia hay khong
      row.isDuration = row.nguoiThang === null && seconds > 0;
      delete row.nguoiThang;

      if(row.isDuration === true){        
        //console.log(seconds);
        const day = Math.floor(seconds / (24*60*60));
        //console.log(day);
        seconds = seconds % (24*60*60);
        //console.log(seconds);
        if(seconds > 0){
          const hour = moment.utc(seconds * 1000).format('hh');
          const minute = moment.utc(seconds * 1000).format('mm');
          const second = moment.utc(seconds * 1000).format('ss');

          row.timeOut = day.toString() + 'd ' + hour + 'h ' + minute + 'm '+ second + 's';
        }
      }
      else
        row.timeOut = '0d 0h 0m 0s';
      delete row.timeEnd;
    }
  }
  //console.log(rows);
  res.render('vwAccount/vwProfile/wishlist',{
    products: rows,
    empty: rows.length === 0,
  });
});

router.get('/wishlist/del/:id', async (req, res) => {
  const result = await userModel.delFavorProduct(req.session.authUser.id_user,+req.params.id);
  res.redirect('/user/wishlist');
})

//seller's views

router.get('/manageProductSeller',(req, res) =>{
  res.render('vwAccount/manageProductSeller');
});

router.get('/manageProductSeller/sellerSoldItems',(req, res) =>{
  res.render('vwAccount/sellerSoldItems');
});

router.get('/manageProductSeller/post_productSeller',(req, res) =>{
  res.render('vwAccount/post_productSeller');
});

module.exports = router;