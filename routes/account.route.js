const express = require('express');

const router = express.Router();

router.get('/',  (req, res) => {
   
    res.render('_account/account',{
      showMenuAcc:true,
      active_bg: true
    });
  })
  
  router.get('/changePW',  (req, res) => {
   
    res.render('_account/changePW',{
      showMenuAcc:true,
      active_changePW:true
      
    });
  })

  router.get('/wishlist',  (req, res) => {
   
    res.render('_account/wishlist',{
      showMenuAcc:true,
      active_wl: true
    });
  })

  router.get('/feedback',  (req, res) => {
   
    res.render('_account/feedback',{
      showMenuAcc:true,
      active_fb: true
    });
  })

  router.get('/bidding',  (req, res) => {
   
    res.render('_account/bidding',{
      showMenuAcc:true,
      active_bd: true
    });
  })

  router.get('/successfulBid',  (req, res) => {
   
    res.render('_account/successfulBid',{
      showMenuAcc:true,
      active_sb: true
    });
  })
 

  router.get('/manageProduct',  (req, res) => {
   
    res.render('_account/manageProduct',{
      showMenuAcc:true,
      active_mp: true
    });
  })


  module.exports = router;

