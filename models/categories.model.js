const db = require('../utils/db');

module.exports = {
  allChildByPapa: (id) => db.load(`select * 
  from danhmuc  
  where id_DM_cha = ${id}` ),

  all: () => db.load('select * from danhmuc'),
  single: id => db.load(`select * from danhmuc where id = ${id}`),
  add: entity => db.add('danhmuc', entity),
  del: id => db.del('danhmuc', { CatID: id }),
  patch: entity => {
    const condition = { CatID: entity.CatID };
    delete entity.CatID;
    return db.patch('danhmuc', entity, condition);
  },

  allWithDetails: _ => {
    const sql = `select id,ten_DM, count(id_SP) as num_of_products
    from danhmuc left join dmsp on id = id_DM
    group by id,ten_DM`;
    return db.load(sql);
  },
  allChild: (id_Cha) => {
    const sql = `select dm.id,dm.ten_DM, count(dp.id_SP) as num_of_products
    from danhmuc dm left join dmsp dp on dm.id = dp.id_DM left join danhmuc_cha  dmc on  dm.id_DM_cha = dmc.id
    where dmc.id = ${id_Cha} 
    group by dm.id,dm.ten_DM`;
    return db.load(sql);
  },
  allChildCanSell: (id_Cha) => {
    const sql = `select dm.id,dm.ten_DM, count(sell.id) as num_of_products
    from danhmuc dm left join dmsp dp on dm.id = dp.id_DM left join danhmuc_cha  dmc on  dm.id_DM_cha = dmc.id LEFT JOIN (SELECT id
      FROM sanpham
      WHERE boSungThongTin = 1 and TIMEDIFF(timeEnd,NOW()) > 0 AND ISNULL(nguoiThang)) AS	sell ON dp.id_SP = sell.id
    where dmc.id = ${id_Cha} 
    group by dm.id,dm.ten_DM`;
    return db.load(sql);
  },
  categoryPapa: (id) => db.load(`select ten_DM_cha,dmc.id as id_Cha, ten_DM, dm.id as id_Con 
  from danhmuc dm join danhmuc_cha dmc on dm.id_DM_cha = dmc.id
  where dm.id = ${id}`),
  allCategoryPapa: () => db.load(`select ten_DM_cha,id
  from danhmuc_cha`),
  allCategoryChild: () => db.load(`select ten_DM_cha,dmc.id as id_Cha, ten_DM, dm.id as id_Con from danhmuc dm join danhmuc_cha dmc on dm.id_DM_cha = dmc.id`),

};
