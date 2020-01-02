const db = require('../../utils/db');

module.exports = {

  all: () => db.load('select * from nguoidung'),

  single: id => db.load(`select * from nguoidung where id_user = ${id}`),
  add: entity => db.add('nguoidung', entity),
  del: id => db.del('nguoidung', { id: id }),
 
  patch: entity => {
    const condition = { id_user: entity.id_user };
    delete entity.id_user;
    return db.patch('nguoidung', entity, condition);
  },

  allWithDetails: _ => {
    const sql = `
      select c.CatID, c.CatName, count(p.ProID) as num_of_products
      from categories c left join products p on c.CatID = p.CatID
      group by c.CatID, c.CatName`;
    return db.load(sql);
  },
};
