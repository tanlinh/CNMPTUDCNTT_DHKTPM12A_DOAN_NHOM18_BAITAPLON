var express = require('express');
var router = express.Router();
var dangki = require('../model/dangki');

router.route('/dangki')
    .get(function (req, res) {
        res.render('dangki',{DkiErr:12 });
    })

 router.route('/dangki')
    .post(dangki.checkdangki);

// router.route('/dangki')
//     .post(dangki.checkdangki) 
//         res.json(req.body);
        



module.exports = router;