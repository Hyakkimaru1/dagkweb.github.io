const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts'
}));
app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  // res.end('hello from expressjs');
  res.render('home');
})

app.use('/account', require('./routes/user/user.route'));
app.use('/product', require('./routes/users/product.route'));
app.use('/categories', require('./routes/users/categories.route'));

app.use((req, res, next) => {
  // res.render('vwError/404');
  res.render('error',{layout:'error'});
})

app.use((err, req, res, next) => {
  // res.render('vwError/index');
  console.error(err.stack);
  res.status(500).render('error',{layout:'error'});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})