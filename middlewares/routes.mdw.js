const restrict = require('../middlewares/auth.mdw');

module.exports = function (app) {

    app.use('/account', require('../routes/user/user.register.route'));

    app.use('/user',restrict, require('../routes/user/user.route'));

    app.use('/product', require('../routes/users/product.route'));

    app.use('/categories', require('../routes/users/categories.route'));

    app.use('/seller', require('../routes/users/seller.route'));

    app.use('/admin/categories', require('../routes/admin/adCategories.route'));

    app.use('/admin/users', require('../routes/admin/adUsers.route'));

    app.use('/admin/products', require('../routes/admin/adProducts.route'));

};