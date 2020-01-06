const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const sendMailModel = require('../models/sendMail.model');
module.exports = function (app) {
    

    app.use(async (req, res,next) => {
      //Lấy tất cả sản phẩm
        const allProductNeedSend = await productModel.getallProductNeedSend();
        for (const child of allProductNeedSend)
        {
          if (child.nguoiGiuGia !== null)
          {
            const [seller,bidder] = await Promise.all([
              userModel.single(child.nguoiBan),
              userModel.single(child.nguoiGiuGia)
            ]);
            sendMailModel.sendMailEndWin(seller,bidder,child.ten_SP,child.gia_HienTai);
          }
          else {
            const seller = await  userModel.single(child.nguoiBan);
            sendMailModel.sendSellerEnd(seller,child.ten_SP);
          }
          await productModel.patch({SendMail:1},child.id);
        }
       
        next();
      })

}
