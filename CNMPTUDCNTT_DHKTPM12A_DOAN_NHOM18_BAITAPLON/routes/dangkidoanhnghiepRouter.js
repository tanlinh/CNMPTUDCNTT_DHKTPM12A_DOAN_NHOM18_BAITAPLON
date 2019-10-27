var express = require('express');
var router = express.Router();
var dangkidoanhnghiep = require('../model/dangkidoanhnghiep');
var dangki = require ('../model/dangki');
    router.get('/dangkidoanhnghiep', async (req, res) => {
    
     var result = await dangkidoanhnghiep.getdichvu();
      res.render('doanhnghiep/dangkidoanhnghiep', {"listdichvu": result.data.Items});
      });


    router.route('/dangkidoanhnghiep')
    .post(dangki.checkdangki);

module.exports = router;