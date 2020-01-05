const db = require('../utils/db');
const config = require('../config/default.json');


module.exports = {
    countSearchByName: async tukhoa =>{
        const rows = await db.load(`select count(*) as total from (select * from sanpham where 
            MATCH(ten_SP, moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE)) AS l 
            WHERE ISNULL(l.nguoiThang) AND l.timeEnd - now() > 0`);
        return rows[0].total;
    },
    searchByName: (tukhoa,offset,sort) => db.load(`select * from sanpham where ISNULL(nguoiThang) AND timeEnd - now() > 0 AND
    MATCH(ten_SP, moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE) ORDER BY ${sort} limit ${config.paginate.limit} offset ${offset}`),
    countBid: async id => {
        const rows = await db.load(`select count(*) as total from sanpham JOIN chi_tiet_ra_gia ON ${id} = id_SP`);
        return rows[0].total;
    },
};
