const express = require('express');

const router = express.Router();

router.get('/',  (req, res) => {
   
    res.render('_account/account');
  })

  router.get('/bidding',  (req, res) => {
   
    res.render('_account/bidding');
  })

  router.get('/bidding/feedback',  (req, res) => {
   
    res.render('_account/changePW',{
      showMenuAcc:true
    });
  })


  module.exports = router;

