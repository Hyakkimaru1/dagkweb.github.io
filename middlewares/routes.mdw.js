const restrict = require('../middlewares/auth.mdw');
const restrictSeller = require('../middlewares/seller.mdw');
const restrictAdmin = require('../middlewares/admin.mdw');

module.exports = function (app) {

    app.use('/search',require('../routes/search.route'));

    app.use('/account', require('../routes/user/user.register.route'));

    app.use('/user',restrict, require('../routes/user/user.route'));

    app.use('/product', require('../routes/users/product.route'));

    app.use('/categories', require('../routes/users/categories.route'));

    app.use('/seller',restrictSeller, require('../routes/users/seller.route'));

    app.use('/admin/categories',restrictAdmin, require('../routes/admin/adCategories.route'));

    app.use('/admin/users',restrictAdmin, require('../routes/admin/adUsers.route'));

    app.use('/admin/products',restrictAdmin, require('../routes/admin/adProducts.route'));

};