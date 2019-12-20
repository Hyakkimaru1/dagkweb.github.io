const restrict = require('../middlewares/auth.mdw');

module.exports = function (app) {
    app.use('', require('../routes/user/user.register.route'));
    app.use('/account',restrict, require('../routes/user/user.route'));
    app.use('/product', require('../routes/users/product.route'));
    app.use('/categories', require('../routes/users/categories.route'));
};