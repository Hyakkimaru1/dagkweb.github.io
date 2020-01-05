const db = require('../utils/db');
const config = require('../config/default.json');

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
  selectID_DG: async (idSP,idUser) =>{ 
    const rows = await db.load(`select id_DG from chi_tiet_DG where id_nguoi_DG = '${idUser}' and id_sp_duoc_dg ='${idSP}'`); 
    if(rows.length === 0)
      return null;
    return rows[0];
  },
  addDG: entity => db.add('chi_tiet_dg',entity),
  add: entity => db.add('nguoidung', entity),
  addBan: entity => db.add('cam_nguoi_mua', entity),
  addFavourite: entity => db.add('sp_yeu_thich', entity),
  del: id => db.del('nguoidung', { id_user: id }),
  delFavorProduct: (idUser,id) => db.delSpecial('sp_yeu_thich',[{id_NM :idUser}, {id_SP: id}]),
  patch: entity => {
    const condition = { id_user: entity.id_user };
    delete entity.id_user;
    return db.patch('nguoidung', entity, condition);
  },
  patch_dg: entity => {
    const condition = { id_DG: entity.id_DG };
    delete entity.id_DG;
    return db.patch('chi_tiet_dg', entity, condition);
  },
  patchByEmail: entity => {
    const condition = { email: entity.email };
    delete entity.email;
    return db.patch('nguoidung', entity, condition);
  },
  getFeedback: id => db.load(`select * from chi_tiet_dg where id_nguoi_duoc_DG = '${id}'`),
  getWishlist: id => db.load(`select id,ten_SP,gia_MuaNgay,moTaSP,timeEnd,nguoiThang from sanpham JOIN sp_yeu_thich ON id = id_SP AND id_NM = '${id}'`),
  getWonlist: id => db.load(`select id,ten_SP,gia_HienTai,moTaSP,nguoiBan from sanpham where nguoiThang = '${id}' OR (nguoiGiuGia = '${id}' AND now() - timeEnd >= 0)`),
  getCartBidding: id => db.load(`select id_SP , gia from chi_tiet_ra_gia ct1 where timeCreate = (
     select MAX(timeCreate) from chi_tiet_ra_gia ct2 where ct2.id_NM = '${id}'  AND ct1.id_NM = ct2.id_NM)`),
  getSP: async id => {
  const rows = await db.load(`select ten_SP,gia_MuaNgay,moTaSP,timeEnd,nguoiBan,nguoiThang from sanpham where id ='${id}'`);
    if (rows.length === 0)
      return null;

    return rows[0];
  },
  getDetailRating: id_nguoi_duoc_dg => db.load(`select * from chi_tiet_dg where id_nguoi_duoc_DG = ${id_nguoi_duoc_dg}`),
  getTotalRating: id_nguoi_duoc_dg => db.load(`select count(*) as total from chi_tiet_dg where id_nguoi_duoc_DG = ${id_nguoi_duoc_dg}`),
  getHadFavorite: (id_NM,id_SP) => db.load(`select * from sp_yeu_thich where id_SP = ${id_SP} and id_NM = ${id_NM}`),
};