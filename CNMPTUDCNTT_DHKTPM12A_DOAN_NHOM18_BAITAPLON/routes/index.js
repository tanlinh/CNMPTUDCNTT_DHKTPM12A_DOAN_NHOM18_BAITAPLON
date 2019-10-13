var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dangki', async (req, res) => {
  return res.render('dangki');
})
router.get('/dangnhap', async (req, res) => {
  return res.render('dangnhap');
})
router.get('/thanhtoan', async (req, res) => {
  return res.render('thanhtoan');
})
router.get('/naptien', async (req, res) => {
  return res.render('naptien');
})
router.get('/lichsugiaodich', async (req, res) => {
  return res.render('lichsugiaodich');
})
router.get('/vantinsodu', async (req, res) => {
  return res.render('vantinsodu');
})
router.get('/dangkiSNS', async (req, res) => {
  return res.render('dangkiSNS');
})
router.get('/doanhnghiep', async (req, res) => {
  return res.render('doanhnghiep/indexdoanhnghiep');
})
router.get('/dangkidoanhnghiep', async (req, res) => {
  return res.render('doanhnghiep/dangkidoanhnghiep');
})
module.exports = router;
