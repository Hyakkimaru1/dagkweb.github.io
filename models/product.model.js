const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
  soldProduct: id=> db.load(`select sp.*,c.id_NM,n.lastname,c.id_SP, count(c.id_SP) as num_of_bid
  from sanpham sp LEFT JOIN chi_tiet_ra_gia c on sp.id=c.id_SP and sp.gia_HienTai = c.gia LEFT JOIN nguoidung n on (IF(sp.nguoiThang,sp.nguoiThang,sp.nguoiGiuGia) = n.id_user )
  where (isPay = 1 AND sp.nguoiThang IS NOT NULL or (sp.nguoiGiuGia is not null and now() - timeEnd >= 0))	AND sp.nguoiBan=${id}
	group by sp.id`),
  
  sellingProduct: id=> db.load(`select sp.*,c.id_NM,n.lastname, count(c.id_SP) as num_of_bid
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
    const rows = await db.load(`select count(*) as total from dmsp JOIN sanpham ON id_SP = id where  boSungThongTin = 1 and id_DM = ${id_DM}  AND TIMEDIFF(timeEnd,NOW()) > 0 AND ISNULL(nguoiThang)`)
    return rows[0].total;
  },
  pageByCatCanSell: (id_DM,id_Cha, offset) => db.load(`
  select * 
  from sanpham sp join dmsp on id_SP = sp.id join danhmuc dm on dm.id = id_DM 
  where dm.id_DM_cha = ${id_Cha} and sp.boSungThongTin = 1 and dm.id = ${id_DM} and (TIMEDIFF(sp.timeEnd,NOW()) > 0) AND ISNULL(sp.nguoiThang)
  limit ${config.paginate.limit} offset ${offset}`),


  pageByCat: (id_DM,id_Cha, offset) => db.load(`
  select * 
  from sanpham sp join dmsp on id_SP = sp.id join danhmuc dm on dm.id = id_DM JOIN (SELECT id, IF (TIMEDIFF(timeEnd,NOW()) > 0 AND ISNULL(nguoiThang),1,0) AS canSell 
  FROM sanpham) AS	sell ON sp.id = sell.id
  where dm.id_DM_cha = ${id_Cha} and dm.id = ${id_DM} 
  limit ${config.paginate.limit} offset ${offset}`),

  bidder:id_SP=> db.load(`select * from sanpham s join chi_tiet_ra_gia c on c.id_SP = ${id_SP} where s.gia_HienTai = c.gia`),




  single: id => db.load(`select * from sanpham where id = ${id}`),
  addStep1: (entity,nguoiBan) => db.addStep1('sanpham', entity,nguoiBan),
  addDmsp: entity => db.add('dmsp', entity),
  addLinkAnh: entity => db.add('anh_cua_sanpham', entity),
  add: entity => db.add('sanpham', entity),
  del: id => db.del('sanpham', { ProID: id }),
  delBidder: entity => db.delSpecial2('chi_tiet_ra_gia', entity.id_SP,entity.id_NM),
  patch: (entity,id) => {
    const condition = { id: id };
    delete entity.primaryAuto;
    return db.patch('sanpham', entity, condition);
  },
  getLinkImg: id => db.load(`select link_anh from anh_cua_sanpham where id_sp = ${id}`),
  totalProductNeedInf: id => db.load(`select count(*) from sanpham where nguoiBan = ${id} and boSungThongTin = 0`),
  getAllDetail: id => db.load(`select * from chi_tiet_ra_gia ct join nguoidung nd where ct.id_NM = nd.id_user and ct.id_SP = ${id} ORDER BY ct.id DESC`),
  getBidderPrice: id => db.load(`select * 
  from nguoidung nd join chi_tiet_ra_gia ct
  where ct.id_SP = ${id}  and nd.id_user = ct.id_NM and ct.gia >= (select MAX(gia) 
                                          from chi_tiet_ra_gia 
                                          where id_SP = ${id}) `),
  addPriceTable: (gia,id_SP,id_NM) => {
    const entity = { gia,id_SP,id_NM}
    return db.add('chi_tiet_ra_gia', entity)
  },
  isBanCurUser:   (id_NM,id_sp) =>  db.load(`SELECT * FROM cam_nguoi_mua WHERE id_sp = ${id_sp} AND id_NM = ${id_NM}`),
  patchIsPay: entity => {
    const condition = { id: entity.idSP };
    delete entity.id_DG;
    return db.patch('sanpham', entity, condition);
  },
};
