const express = require('express');
const categoryModel = require('../../models/categories.model');
const productModel = require('../../models/product.model');
const config = require('../../config/default.json');
const userModel = require('../../models/user.model');

const router = express.Router();


router.get('/', async (req, res) => {
  res.redirect('categories/1');
})

router.get('/:id', async (req, res) => {

  req.session.urlBack = req.originalUrl;
  const id_Cha = req.params.id;
  const limit = config.paginate.limit;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const offset = (page - 1) * config.paginate.limit;
  const lcCategories = await categoryModel.allCategoryPapa();

  let total = 0;
  for (const child of lcCategories)
  { 
    let totalTemp = 0;
    const countCategories = await categoryModel.allChildCanSell(child.id);
    //console.log(countCategories);
    for (const child2 of countCategories)
    {
      totalTemp += +child2.num_of_products;
      if (child.id === +req.params.id){
        total += +child2.num_of_products;
      }
    }
    child.num_of_products = totalTemp;
  }
 
  const rows = await productModel.pageByCatPapaCanSell(id_Cha, offset);
  for (const c of lcCategories) {
    if (c.id === +req.params.id) {
      c.isActive = true;
    }
  }
  for( const i of rows)
  {
    const t = await productModel.get1LinkImg(i.id);
    console.log(t);
    i.link_anh= t[0].link_anh;
  }

  for( const i of rows)
  {
    let t = await productModel.get1LinkImg(i.id);
    i.link_anh= t[0].link_anh;
    
  } 

  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page,
    })
  }
  let isMax = +page !== nPages;
  let isMin = +page !== 1;
 
  for (let row of rows) {
    //check đã thích hay chưa
    if (req.session.isAuthenticated === true) {
      const check = await userModel.singleLike(row.id, req.session.authUser.id_user);
      if (check === null) {
        row.isLike = false;
      }
      else {
        row.isLike = true;
      }
    }
    else {
      row.isLike = false;
    }
  }
 
  res.render('_categories/categoriesPapa', {
    lcCategories,
    rows,
    empty: rows.length === 0,
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
    isMax,
    isMin
  });
})


router.get('/:id/:id2', async (req, res) => {
  req.session.urlBack = req.originalUrl;
  const id_Cha = req.params.id;
  const id_DM = req.params.id2;
  const limit = config.paginate.limit;
  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const offset = (page - 1) * config.paginate.limit;

  const [lcCategories,total, rows, links] = await Promise.all([
    categoryModel.allChildCanSell(id_Cha),
    productModel.countByCatCanSell(id_DM),
    productModel.pageByCatCanSell(id_DM,id_Cha, offset),
    categoryModel.categoryPapa(id_DM),
   
  ]);
  for (const c of lcCategories) {
    if (c.id === +req.params.id2) {
      c.isActive = true;
    }
  }

  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page,
    })
  }
  let isMax = +page !== nPages;
  let isMin = +page !== 1;
  for( const i of rows)
  {
    const t = await productModel.get1LinkImg(i.id);
    i.link_anh= t[0].link_anh;
  }
  for (let row of rows) {
    //check đã thích hay chưa
    if (req.session.isAuthenticated === true) {
      const check = await userModel.singleLike(row.id, req.session.authUser.id_user);
      if (check === null) {
        row.isLike = false;
      }
      else {
        row.isLike = true;
      }
    }
    else {
      row.isLike = false;
    }
  }
  console.log(rows);
  
  res.render('_categories/categories', {
    lcCategories,
    rows,
    empty: rows.length === 0,
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
    isMax,
    isMin,
    links: links[0]
  });
})


router.post('/add', async (req, res) => {
  // console.log(req.body);
  // const entity = {
  //   CatName: req.body.txtCatName
  // }
  const result = await categoryModel.add(req.body);
  // console.log(result.insertId);
  res.render('vwCategories/add');
})

router.get('/err', (req, res) => {

  throw new Error('error occured');
})

router.get('/edit/:id', async (req, res) => {
  const rows = await categoryModel.single(req.params.id);
  if (rows.length === 0) {
    throw new Error('Invalid category id');
  }
  // const c = {
  //   CatID: req.params.id,
  //   CatName: 'unknown'
  // }
  res.render('vwCategories/edit', {
    category: rows[0]
  });
})

router.post('/patch', async (req, res) => {
  const result = await categoryModel.patch(req.body);
  res.redirect('/admin/categories');
})

router.post('/del', async (req, res) => {
  const result = await categoryModel.del(req.body.CatID);
  // console.log(result.affectedRows);
  res.redirect('/admin/categories');
})

module.exports = router;