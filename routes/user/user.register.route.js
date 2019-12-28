const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/user.model');
const restrict = require('../../middlewares/auth.mdw');

const router = express.Router();

router.get('/register',(req, res) => {
  res.render('vwAccount/register');
});

router.post('/register', async (req, res) => {//chua check recaptcha
  const N = 10;
  const hash = bcrypt.hashSync(req.body.raw_password, N);
  const entity = req.body;
  entity.password = hash;
  entity.Permission = 0;
  entity.diem_DG = 0;
  entity.isActive = 0;
  //const recaptcha = 'g-recaptcha-response';
  delete entity.raw_password;
  delete entity['g-recaptcha-response'];
  console.log(entity);
  res.end();

  const result = await userModel.add(entity);
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('vwAccount/login');
});

router.post('/login', async (req, res) => {

  const user = await userModel.singleByUsername(req.body.username);
  if (user === null)
    throw new Error('Invalid  username or password.');
  
  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false)
    return res.render('vwAccount/login', {
      err_message: 'Login failed'
    });

  delete user.password;
  req.session.isAuthenticated = true;
  req.session.authUser = user;
  console.log(user);
  const url = req.query.retUrl || '/';
  res.redirect(url); 
});

router.post('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});

module.exports = router;