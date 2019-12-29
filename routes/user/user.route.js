const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/profile', (req, res) => {
  res.render('vwAccount/vwProfile/profile');
})

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
  
})

router.get('/cartBidding', (req, res) => {
    res.render('vwAccount/vwProfile/cartBidding');
})

router.get('/changepwd', (req, res) => {
  res.render('vwAccount/vwProfile/changePwd');
})

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

router.get('/feedback', (req, res) => {
  res.render('vwAccount/vwProfile/feedback');
})

router.get('/successfulBid', (req, res) => {
  res.render('vwAccount/vwProfile/successfulBid');
})

router.get('/wishlist', (req, res) => {
  res.render('vwAccount/vwProfile/wishlist');
})

//seller's views

router.get('/manageProductSeller',(req, res) =>{
  res.render('vwAccount/manageProductSeller');
})

router.get('/manageProductSeller/sellerSoldItems',(req, res) =>{
  res.render('vwAccount/sellerSoldItems');
})

router.get('/manageProductSeller/post_productSeller',(req, res) =>{
  res.render('vwAccount/post_productSeller');
})

module.exports = router;