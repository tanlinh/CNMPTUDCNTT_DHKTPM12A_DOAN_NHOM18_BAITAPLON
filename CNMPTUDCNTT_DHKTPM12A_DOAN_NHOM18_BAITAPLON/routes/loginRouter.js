var express = require('express');
var router = express.Router();
var login = require('../model/login');


router.route('/dangnhap')
    .get(function (req, res) {
        res.render('dangnhap',{loginErr: 12});
    })


router.route('/dangnhap')
    .post(login.checkLogin) ;




module.exports = router;