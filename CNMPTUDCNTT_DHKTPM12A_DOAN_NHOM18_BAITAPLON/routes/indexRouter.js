var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 return res.render('index');
});




router.get('/index', function(req, res, next) {
  return res.render('indexkhachhang');
});

// router.get('/thanhtoan', async (req, res) => {
//   return res.render('thanhtoan');
// })  
router.get('/lichsugiaodich', async (req, res) => {
  return res.render('lichsugiaodich');
})
router.get('/vantinsodu', async (req, res) => {
  return res.render('vantinsodu');
})
router.get('/dangkiSNS', async (req, res) => {
  return res.render('dangkiSNS');
})



module.exports = router;
