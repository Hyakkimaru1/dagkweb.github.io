module.exports = function (app) {
    app.use('/seller', require('../routes/users/seller.route'));

    app.use('/product', require('../routes/users/product.route'));

    app.use('/categories', require('../routes/users/categories.route'));

    app.use('/account', require('../routes/user/user.route'));
}
