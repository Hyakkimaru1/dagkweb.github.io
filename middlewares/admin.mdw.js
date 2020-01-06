module.exports = (req, res, next) => {
    if (req.session.isAuthenticated === false){
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }

    if(req.session.authUser.Permission !== 2){
        throw Error('Access denied!');
    }
  
    next();
  }