var express = require('express');
var router = express.Router();



router.route('/quanlyhoadon')
    .get(function (req, res) {
        res.render('doanhnghiep/quanlyhoadon');
    })


module.exports = router;