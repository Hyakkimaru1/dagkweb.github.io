const express = require('express');
const searchModel = require('../models/search.model');
const config = require('../config/default.json');
const moment = require('moment');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', async (req, res) => {
    req.session.urlBack = req.originalUrl; 
    let sortBy = req.query.sortBy;
    let orderBy;
    console.log(sortBy);
    let sort='';
    let priceSort = 'Price';
    //ban dau tim kiem thi mac dinh sort theo thoi gian ket thuc tang dan
    if(sortBy === undefined){
        sortBy = 'time';
        orderBy = 'asc';
        sort = 'timeEnd asc';//mac dinh ngay giam dan
    }
    else {
        if (sortBy === 'price') {
            orderBy = req.query.orderBy;
            if (orderBy === 'asc' ) {
                sort = 'gia_HienTai ' + orderBy;
                priceSort = 'Price Ascending';
            }
            
            if(orderBy === 'desc'){
                sort = 'gia_HienTai ' + orderBy;
                priceSort = 'Price Decreasing';
            }
        }
        else {
            sort = 'timeEnd asc';//mac dinh ngay giam dan
        }
    }
    console.log(sort);
    
    const kw = req.query.keyword;
    const limit = config.paginate.limit;
    console.log(req.query.page);
    let page = req.query.page || 1;
    if (page < 1) page = 1;
    let offset = (page - 1) * config.paginate.limit;

    const [total, rows] = await Promise.all([
        searchModel.countSearchByName(kw),
        searchModel.searchByName(kw, offset,sort)
    ]);

    for(let row of rows){
        //kiem tra thoi han dang san pham
        let seconds = moment().unix() - moment(row.timeCreate).unix();
        row.isNew = seconds/60 < config.newProduct.time;
        //đếm lượt bid
        row.countBid = await searchModel.countBid(row.id);
        //định dạng date để in ra view
        row.timeCreate = moment(row.timeCreate).format('HH:mm:ss DD-MM-YYYY').toString();
        //id sản phẩm
        row.id_SP = row.id;
        //link ảnh
        const link_anh = await productModel.getLinkImg(row.id);
        console.log(link_anh);
        row.link = "/imgs/" + row.id + "/" + link_anh[0].link_anh;

        //lay ten nguoi bid
        const user = await userModel.single(row.nguoiGiuGia);
        if(!(user === null)){
            row.maskName = user.username.replace(/\w(?=\w{3})/g, "*");
        }
        else{
            row.maskName = '';
        }
        if (req.session.isAuthenticated === true) {
            //check đã thích hay chưa
            const check = await userModel.singleLike(row.id, req.session.authUser.id_user);
            if (check === null) {
                row.isLike = false;
            }
            else {
                row.isLike = true;
            }
        }
        else{
            row.isLike = false;
        }
    }
    console.log(total);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }
    console.log(rows);
    console.log(page_numbers);
    res.render('search', {
        product: rows,
        keyword: kw,
        sortBy,
        orderBy,
        priceSort,
        isSort: sortBy === 'price',
        empty: rows.length === 0,
        page_numbers,
        cur_value: +page,
        prev_value: +page - 1 === 0? 1 : +page - 1,
        next_value: +page + 1 > nPages? +page : +page + 1,
    });
});


module.exports = router;