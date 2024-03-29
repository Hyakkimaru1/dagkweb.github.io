const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const session = require('express-session');
const numeral = require('numeral');
const morgan = require('morgan');
const productModel = require('./models/product.model');

require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //     secure: true
  // }
}))
app.use(express.static('resources'));
app.use(express.static('public'));
app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts',
  helpers: {
    format: val => numeral(val).format('0,0'),
    section: hbs_sections(),
    ifa: function(v1, operator, v2, options) {

      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return operator.inverse(this);
      }
    },
    format: val => numeral(val).format('0,0'),
  }
}));

app.set('view engine', 'hbs');

require('./middlewares/categories.mdw')(app);
require('./middlewares/sendMail.mdw')(app);
require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);



app.get('/', async (req, res) => {
  const [end,bid, price] = await Promise.all([
    productModel.top5NearEnd(),
    productModel.top5MostBid(),
    productModel.top5Pricest(),
    
  ]);

  for( const i of end)
  {
    const t = await productModel.get1LinkImg(i.id);
    i.link_anh= t[0].link_anh;
  }  
  
  for( const i of bid)
  {
    const t = await productModel.get1LinkImg(i.id);
    i.link_anh= t[0].link_anh;
  }  
  for( const i of price)
  {
    const t = await productModel.get1LinkImg(i.id);
    i.link_anh= t[0].link_anh;
  }  
  

  // res.end('hello from expressjs');
  res.render('home',{
   end,
   bid,
   price

  });
 
})


app.use((req, res, next) => {
  // res.render('vwError/404');
  const err = `404 - The Page can't be found`;
  res.render('error', { layout: 'error',err });
})

app.use((err, req, res, next) => {
  // res.render('vwError/index');
  console.error(err.stack);
  res.status(500).render('error', { layout: 'error',err });
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})