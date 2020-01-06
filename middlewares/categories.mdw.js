const categoryModel = require('../models/categories.model')
const productModel = require('../models/product.model');
module.exports = function (app) {
    // app.use(async(req,res,next)=>{
    //     const rows = await categoryModel.allWithDetails();
    //     res.locals.lcCategories = rows;
    //     //console.log(rows);
    //     next();
    //    })

    app.use(async (req, res,next) => {
        const [cat,rowsChild] = await Promise.all([
         
          categoryModel.allCategoryPapa(),
          categoryModel.all()
        ]);
       

        for (const i of cat){
            i.Child = [];
            for (const j of rowsChild)
            {
              if (i.id === j.id_DM_cha){
                i.Child.push(j);
              }
            }
        }
        res.locals.cat=cat;
        // res.end('hello from expressjs');
       
        next();
      })


    



}
