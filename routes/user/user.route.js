const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('vwAccount/account');
})

router.get('/cartBidding', (req, res) => {
    res.render('vwAccount/cartBidding');
})

router.get('/changepwd', (req, res) => {
  res.render('vwAccount/changePwd');
})

router.get('/feedback', (req, res) => {
  res.render('vwAccount/feedback');
})

router.get('/successfulBid', (req, res) => {
  res.render('vwAccount/successfulBid');
})

router.get('/wishlist', (req, res) => {
  res.render('vwAccount/wishlist');
})

router.get('/manageProductSeller',(req, res) =>{
  res.render('vwAccount/manageProductSeller');
})

router.get('/manageProductSeller/sellerSoldItems',(req, res) =>{
  res.render('vwAccount/sellerSoldItems');
})

module.exports = router;