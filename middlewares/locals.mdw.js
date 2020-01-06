module.exports = function (app) {
    app.use(async (req, res, next) => {
 
      if (typeof (req.session.isAuthenticated) === 'undefined') {
        req.session.isAuthenticated = false;
      }
      if(typeof(req.session.isAdmin) === 'undefined'){
        req.session.isAdmin = false;
      }
      res.locals.isAuthenticated = req.session.isAuthenticated;
      res.locals.authUser = req.session.authUser;
      res.locals.isAdmin = req.session.isAdmin;
      next();
    })
  };