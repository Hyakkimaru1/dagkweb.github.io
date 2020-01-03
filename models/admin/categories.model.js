const db = require('../../utils/db');

module.exports = {
  //Danh mục con
  delChild: id => db.del('danhmuc', { id: id }),
 
  patchChild: entity => {
    const condition = { id: entity.id };
    delete entity.id;
    return db.patch('danhmuc', entity, condition);
  },

  delChild: id => db.del('danhmuc', { id: id }),
  addChild: entity => db.add('danhmuc', entity),
  singleChild: (idCha,id) => db.load(`select * from danhmuc where id = ${id} and id_DM_cha=${idCha}`),
  allChild: id  => db.load(`select * from danhmuc where id_DM_cha = ${id}`),
  name:id => db.load(`select ten_DM_cha from danhmuc_cha where id = ${id} `),






  //Danh mục cha
  all: () => db.load('select * from danhmuc_cha'),
  
  
  allproduct:  () => db.load('select * from sanpham'),

  single: id => db.load(`select * from danhmuc_cha where id = ${id}`),
  add: entity => db.add('danhmuc_cha', entity),
  del: id => db.del('danhmuc_cha', { id: id }),
  


  patch: entity => {
    const condition = { id: entity.id };
    delete entity.id;
    return db.patch('danhmuc_cha', entity, condition);
  },

  allWithDetails: _ => {
    const sql = `
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`;
    return db.load(sql);
  },
};
