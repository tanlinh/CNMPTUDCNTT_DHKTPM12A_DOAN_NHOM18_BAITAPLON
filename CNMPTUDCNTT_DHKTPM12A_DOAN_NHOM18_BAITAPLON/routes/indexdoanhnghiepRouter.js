var express = require('express');
var router = express.Router();
var Khachhangdoanhnghiep = require('../model/login');

router.get('/doanhnghiep', function (req, res){
  
    return res.render('doanhnghiep/indexdoanhnghiep');
  })



module.exports = router;
