const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from nguoidung'),
  single: id => db.load(`select * from nguoidung where id_user = ${id}`),
  singleByUsername: async username => {
    const rows = await db.load(`select * from nguoidung where username = '${username}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },
  add: entity => db.add('nguoidung', entity),
  del: id => db.del('nguoidung', { id_user: id }),
};