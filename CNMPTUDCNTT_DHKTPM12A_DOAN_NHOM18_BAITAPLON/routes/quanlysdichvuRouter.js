var express = require('express');
var router = express.Router();
var quanlydichvu = require('../model/quanlydichvu');

router.get('/quanlydichvu', async (req, res) => {
    const qldv = await quanlydichvu.getdichvu();
    return res.render('admin/quanlydichvu',{"qldv":qldv.data.Items});
  })

router.get('/themdichvu', async (req, res) => {
  const id = req.body.id;
  const ten = req.body.ten;
  //const themErr = quanlydichvu.createdichvu(id,ten);
    return res.render('admin/themdichvu',{DVerr:0});
  })

router.post('/themdichvu', async (req, res) => {
    const id = req.body.id;
    const ten = req.body.ten;
  
    let result = await quanlydichvu.createdichvu(id,ten);
  
    return res.redirect('./quanlydichvu');
  })

module.exports = router;