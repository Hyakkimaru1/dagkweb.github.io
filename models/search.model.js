const db = require('../utils/db');
const config = require('../config/default.json');


module.exports = {
    countSearchByName: async tukhoa =>{
        const rows = await db.load(`select count(*) as total from (select * from sanpham where 
            MATCH(ten_SP, moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE)) AS l 
            WHERE ISNULL(l.nguoiThang) AND l.timeEnd - now() > 0`);
        return rows[0].total;
    },
    countSearchByPlus: async (tukhoa,idCat) =>{
        const rows = await db.load(`select count(*) as total from (select * from sanpham sp join dmsp dm ON dm.id_SP = sp.id where dm.id_DM = ${idCat} AND
            MATCH(sp.ten_SP, sp.moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE)) AS l 
            WHERE ISNULL(l.nguoiThang) AND l.timeEnd - now() > 0`);
        return rows[0].total;
    },
    searchByName: (tukhoa,offset,sort) => db.load(`select sp.*, count(c.id_SP) as num_of_bid from sanpham sp LEFT JOIN chi_tiet_ra_gia c on sp.id =c.id_SP where ISNULL(nguoiThang) AND timeEnd - now() > 0 AND
    MATCH(ten_SP, moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE) GROUP BY sp.id ORDER BY ${sort}  limit ${config.paginate.limit} offset ${offset}`),

    
    countBid: async id => {
        const rows = await db.load(`select count(*) as total from sanpham JOIN chi_tiet_ra_gia ON ${id} = id_SP`);
        return rows[0].total;
    },
    searchByNamePlus: (tukhoa,idCat,offset,sort) => db.load(`select sp.*, count(c.id_SP) as num_of_bid from sanpham sp join dmsp dm ON dm.id_SP = sp.id LEFT JOIN chi_tiet_ra_gia c on sp.id=c.id_SP where ISNULL(sp.nguoiThang) AND dm.id_DM =${idCat} AND sp.timeEnd - now() > 0 AND
    MATCH(sp.ten_SP, sp.moTaSP) AGAINST('${tukhoa}' IN NATURAL LANGUAGE MODE) GROUP BY sp.id ORDER BY ${sort} limit ${config.paginate.limit} offset ${offset}`),
};
