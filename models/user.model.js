const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    single: id_user => db.load(`select * from nguoidung where id_user = ${id_user}`)

};