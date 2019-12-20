const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const session = require('express-session');
const morgan = require('morgan');
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

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts',
  helpers: {
    section: hbs_sections(),
  }
}));
app.use(express.static(__dirname + '/resources'));
app.set('view engine', 'hbs');

require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);


app.get('/', (req, res) => {
  // res.end('hello from expressjs');
  res.render('home');
})

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