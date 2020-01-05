const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
  soldProduct: id=> db.load(`select *, count(c.id_SP) as num_of_bid
  from sanpham sp LEFT JOIN chi_tiet_ra_gia c on sp.id=c.id_SP and sp.gia_HienTai = c.gia LEFT JOIN nguoidung n on sp.nguoiThang = n.id_user 
  where sp.nguoiThang IS NOT NULL AND sp.nguoiBan=${id}
	group by sp.id  `),
  
  sellingProduct: id=> db.load(`select *, count(c.id_SP) as num_of_bid
  from sanpham sp LEFT JOIN chi_tiet_ra_gia c on sp.id=c.id_SP and sp.gia_HienTai = c.gia LEFT JOIN nguoidung n on n.id_user = c.id_NM 
  where  (TIMEDIFF(sp.timeEnd,NOW()) > 0) AND ISNULL(sp.nguoiThang) AND sp.nguoiBan=${id}
	group by sp.id `),
  all: () => db.load('select * from sanpham'),
  allByCat: id_DM => db.load(`select * from sanpham join dmsp on id_SP = id where id_DM = ${id_DM}`),
  countByCat: async id_DM => {
    const rows = await db.load(`select count(*) as total from dmsp where id_DM = ${id_DM}`)
    return rows[0].total;
  },
  countByCatCanSell: async id_DM => {
    const rows = await db.load(`select count(*) as total from dmsp JOIN sanpham ON id_SP = id where id_DM = ${id_DM}  AND TIMEDIFF(timeEnd,NOW()) > 0 AND ISNULL(nguoiThang)`)
    return rows[0].total;
  },
  pageByCatCanSell: (id_DM,id_Cha, offset) => db.load(`
  select *, count(c.id_SP) as num_of_bid
  from sanpham sp join dmsp d on d.id_SP = sp.id join danhmuc dm on dm.id = d.id_DM LEFT JOIN chi_tiet_ra_gia c on sp.id=c.id_SP and sp.gia_HienTai = c.gia LEFT JOIN nguoidung n on n.id_user = c.id_NM 
  where dm.id_DM_cha = ${id_Cha} and dm.id = ${id_DM} and (TIMEDIFF(sp.timeEnd,NOW()) > 0) AND ISNULL(sp.nguoiThang)
	group by sp.id 
  limit ${config.paginate.limit} offset ${offset}`),


  pageByCat: (id_DM,id_Cha, offset) => db.load(`
  select * 
  from sanpham sp join dmsp on id_SP = sp.id join danhmuc dm on dm.id = id_DM JOIN (SELECT id, IF (TIMEDIFF(timeEnd,NOW()) > 0 AND ISNULL(nguoiThang),1,0) AS canSell 
  FROM sanpham) AS	sell ON sp.id = sell.id
  where dm.id_DM_cha = ${id_Cha} and dm.id = ${id_DM} 
  limit ${config.paginate.limit} offset ${offset}`),

  bidder:id_SP=> db.load(`select * from sanpham s join chi_tiet_ra_gia c on c.id_SP = ${id_SP} where s.gia_HienTai = c.gia`),




  single: id => db.load(`select * from sanpham where id = ${id}`),
  add: entity => db.add('sanpham', entity),
  del: id => db.del('sanpham', { ProID: id }),
  patch: (entity,id) => {
    const condition = { id: id };
    delete entity.primaryAuto;
    return db.patch('sanpham', entity, condition);
  }
};
