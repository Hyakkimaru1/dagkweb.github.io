const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('vwAccount/account',{layout:'loggedIn'});
})

router.get('/cartBidding', (req, res) => {
    res.render('vwAccount/cartBidding',{layout:'loggedIn'});
})

router.get('/changepwd', (req, res) => {
  res.render('vwAccount/changePwd',{layout:'loggedIn'});
})

router.get('/feedback', (req, res) => {
  res.render('vwAccount/feedback',{layout:'loggedIn'});
})

router.get('/successfulBid', (req, res) => {
  res.render('vwAccount/successfulBid',{layout:'loggedIn'});
})

router.get('/wishlist', (req, res) => {
  res.render('vwAccount/wishlist',{layout:'loggedIn'});
})

router.get('/manageProductSeller',(req, res) =>{
  res.render('vwAccount/manageProductSeller',{layout:'loggedIn'});
})

router.get('/manageProductSeller/sellerSoldItems',(req, res) =>{
  res.render('vwAccount/sellerSoldItems',{layout:'loggedIn'});
})

router.get('/manageProductSeller/post_productSeller',(req, res) =>{
  res.render('vwAccount/post_productSeller', {layout:'post_product'});
})

module.exports = router;