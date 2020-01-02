const express = require('express');
const categoryModel = require('../../models/admin/categories.model');

const router = express.Router();



  router.get('/', async (req, res) => {
    const rows = await categoryModel.all();

    res.render('_admin/manageCategory',{
      showMenuAdmin:true,
      active_category: true,
      categories: rows,
      empty: rows.length === 0
    });
    
  })

  

  router.get('/add', async (req, res) => {
    res.render('_admin/addCategory',{
      showMenuAdmin:true,
      active_category: true
    });
  })
router.post('/add', async(req,res) => {
  
  const result = await categoryModel.add(req.body);
 
  res.redirect('/admin/categories');
});
 
router.get('/edit/:id', async (req, res) => {
  const rows = await categoryModel.single(req.params.id);
  if (rows.length === 0) {
    throw new Error('Invalid category id');
  }
  res.render('_admin/editCategory',{
    showMenuAdmin:true,
    active_category: true,
    category: rows[0]
  });
})

router.post('/patch', async (req, res) => {
  const result = await categoryModel.patch(req.body);
  res.redirect('/admin/categories');
})

router.post('/del', async (req, res) => {
  const result = await categoryModel.del(req.body.id);
 
  res.redirect('/admin/categories');
})

//Child

router.get('/:id/add', async (req, res) => {
  const id = req.params.id;
  res.render('_admin/addCategoryChild',{
    showMenuAdmin:true,
    active_category: true,
    id
  });
})

router.post('/:id/add', async(req,res) => {
  const id = req.params.id;
const result = await categoryModel.addChild(req.body);

res.redirect(`/admin/categories/`+id);
});

router.get('/:id', async (req, res) => {
  const rows = await categoryModel.allChild(req.params.id);
  res.render('_admin/manageCategoryChild',{
    showMenuAdmin:true,
    active_category: true,
    isChild: req.params.id,
    categories: rows,
    empty: rows.length === 0
    
  });
  
})

router.get('/:idCha/edit/:id', async (req, res) => {
  const rows = await categoryModel.singleChild(req.params.idCha,req.params.id);
  console.log(rows);
  if (rows.length === 0) {
    throw new Error('Invalid category id');
  }
  res.render('_admin/editCategoryChild',{
    showMenuAdmin:true,
    active_category: true,
    category: rows[0]
  });
})

router.post('/:id/patch', async (req, res) => {
  const id = req.params.id;
  const result = await categoryModel.patchChild(req.body);
  res.redirect('/admin/categories/'+id);
})

router.post('/:id/del', async (req, res) => {
  const id = req.params.id;
  const result = await categoryModel.delChild(req.body.id);
 
  res.redirect('/admin/categories/'+id);
})

   module.exports = router;
  

