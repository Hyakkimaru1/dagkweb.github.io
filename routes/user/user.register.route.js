const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/user.model');
const nodeMailer = require('../../models/sendMail.model')
const restrict = require('../../middlewares/auth.mdw');



const router = express.Router();

router.get('/register',(req, res) => {
  res.render('vwAccount/vwRegister/register');
});

router.post('/register', async (req, res) => {//chua check recaptcha

  //kiem tra email moi co trung hay khong?
  const user = await userModel.singleByEmail(req.body.email);
  if (!(user === null)){
    return res.render('vwAccount/vwRegister/register', {
      err_message: 'That email address already exists!'
    });
  }

  //bat dau tao account de luu xuong database
  const N = 10;
  const hash = bcrypt.hashSync(req.body.raw_password, N);
  const entity = req.body;
  entity.password = hash;
  entity.Permission = 0;
  entity.diem_DG = 0;
  entity.isActive = false;
  //const recaptcha = 'g-recaptcha-response';
  delete entity.raw_password;
  delete entity['g-recaptcha-response'];
  console.log(entity);

  const result = await userModel.add(entity);

  const data = nodeMailer.sendOTP(entity.email);

  //render view
  req.session.isVerificated = true;
  req.session.VerifyUser = data;
  res.render('vwAccount/vwRegister/confirmEmailOTP',{
    email:entity.email
  });
});

router.post('/sendOTP', async (req,res) => {
  console.log(req.body);
  console.log(req.session.VerifyUser);
  //check otp code
  if(!(req.body.otp === req.session.VerifyUser.otp))
     return res.render('vwAccount/vwRegister/confirmEmailOTP',{
      email: req.session.VerifyUser.email,
      err_message: 'Your OTP code is incorrect!'
    });
  
    //is verificated account
    if(req.session.isVerificated === true){
      const entity = req.session.VerifyUser;
      req.session.isVerificated = false;
      req.session.VerifyUser = null;
      entity.isActive = true;
      delete entity.otp;
      const result = await userModel.patchByEmail(entity);
      return res.render('vwAccount/vwRegister/confirmEmailOTP',{
        success_message:'Your account is activated! You can use this for login to system.'
      })
    }

    //verificated account for change password
    if(req.session.isVerificatedforPWD === true)
       return res.render('vwAccount/vwLogin/newPassword');
});

router.get('/login', (req, res) => {
  res.render('vwAccount/vwLogin/login');
});

router.post('/login', async (req, res) => {

  const user = await userModel.singleByUsername(req.body.username);
  if (user === null)
    return res.render('vwAccount/vwLogin/login', {
      err_message: 'Invalid username or password.'
    });
  console.log(user);
  //account chua duoc active
  if(user.isActive === 0){
    const data = nodeMailer.sendOTP(user.email);
    req.session.isVerificated = true;
    req.session.VerifyUser = data;
    return res.render('vwAccount/vwRegister/confirmEmailOTP', {
      email: data.email,
      err_message: 'Your account does not activate!'
    });
  }
    
  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false)
    return res.render('vwAccount/vwLogin/login', {
      err_message: 'Invalid username or password.'
    });

  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;
  console.log(user);
  const url = req.query.retUrl || '/';
  res.redirect(url); 
});

router.get('/forgotPwd',(req,res) => {
  res.render('vwAccount/vwLogin/forgotPwd');
});

router.post('/forgotPwd', async (req,res)=>{
  //check mail addr in database
  const user = await userModel.singleByEmail(req.body.email);
  if (user === null){
    return res.render('vwAccount/vwLogin/forgotPwd', {
      err_message: 'That email address does not exist!'
    });
  }

  const data = nodeMailer.sendOTP(user.email);
  //render view
  req.session.isVerificatedforPWD = true;
  req.session.VerifyUser = data;
  res.render('vwAccount/vwRegister/confirmEmailOTP',{
    email:data.email
  });
})

router.post('/newPassword' , async (req,res) => {
  console.log(req.body);
  const entity = req.session.VerifyUser;
  console.log(entity);
  req.session.isVerificatedforPWD = false;
  req.session.VerifyUser = null;
  delete entity.otp;

  const N = 10;
  entity.password = bcrypt.hashSync(req.body.newpassword, N);

  const result = await userModel.patchByEmail(entity);
  res.render('vwAccount/vwLogin/newPassword',{
    success_message:'Your password is changed! You can use this for login to system.'
  })
});

router.get('/resend',(req,res) => {
  const data = nodeMailer.sendOTP(req.session.VerifyUser.email);
  //render view
  req.session.VerifyUser.otp = data.otp;
  res.render('vwAccount/vwRegister/confirmEmailOTP',{
    email:data.email
  });
});

router.post('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});

module.exports = router;