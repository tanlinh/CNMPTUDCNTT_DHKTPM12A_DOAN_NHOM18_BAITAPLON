var express = require('express');
var router = express.Router();



router.route('/taomoihoadon')
    .get(function (req, res) {
        res.render('doanhnghiep/taohoadon');
    })

module.exports = router;