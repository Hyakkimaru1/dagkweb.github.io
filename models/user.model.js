const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from nguoidung'),
  single: async id =>{
    const rows = await db.load(`select * from nguoidung where id_user = ${id}`);
    if (rows.length === 0)
      return null;

    return rows[0];
  } ,
  singleByUsername: async username => {
    const rows = await db.load(`select * from nguoidung where username = '${username}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },
  singleByEmail: async email => {
    const rows = await db.load(`select * from nguoidung where email = '${email}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },
  add: entity => db.add('nguoidung', entity),
  del: id => db.del('nguoidung', { id_user: id }),
  patch: entity => {
    const condition = { id_user: entity.id_user };
    delete entity.id_user;
    return db.patch('nguoidung', entity, condition);
  },
  patchByEmail: entity => {
    const condition = { email: entity.email };
    delete entity.email;
    return db.patch('nguoidung', entity, condition);
  },
};