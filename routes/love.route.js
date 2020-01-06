const express = require('express');
const userModel = require('../models/user.model');
const moment = require('moment');

const router = express.Router();

router.get('/', async(req,res) =>{
    console.log(req.query);
    const checkLike = await userModel.singleLike(req.query.id_SP,req.session.authUser.id_user);
    if(checkLike === null){
        const entity = req.query;
        entity.id_NM = req.session.authUser.id_user;
        const rs = await userModel.addFavourite(entity);
    }
    res.redirect(req.session.urlBack);
});



module.exports = router;