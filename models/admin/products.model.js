const db = require('../../utils/db');

module.exports = {
  single: id => db.load(`select * from sanpham where id = ${id}`),
  all: () => db.load('select * from sanpham'),

  
  add: entity => db.add('sanpham', entity),
  del: id => db.del('sanpham', { id: id }),
 
  patch: entity => {
    const condition = { id: entity.id };
    delete entity.id;
    return db.patch('sanpham', entity, condition);
  },

};
