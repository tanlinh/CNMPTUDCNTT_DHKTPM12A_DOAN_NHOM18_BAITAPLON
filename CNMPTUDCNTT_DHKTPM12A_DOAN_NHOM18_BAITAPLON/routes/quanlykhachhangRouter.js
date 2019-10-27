var express = require('express');
var router = express.Router();
var quanlykhachhang = require('../model/quanlykhachhang');


router.get('/quanlykhachhang', async (req, res) => {
    const qlkh = await quanlykhachhang.getkhachhang(); 
    return res.render('admin/quanlykhachhang',{"qlkh":qlkh.data.Items});
  })


  router.get('/deletekhachhang', async (req, res) =>{
    const {id,ten} = req.query;
    let result = await quanlykhachhang.deletekhachhang(id,ten);
  
    if(result.err){
      res.send('Unble to delete ');
      console.error("ERROR Delete: ", JSON.stringify(err,null,2));
      return;
    }
  
    return res.redirect('./quanlykhachhang');
  })


  router.get('/updatekhachhang' ,async (req, res) =>{
    const id = req.query.id; 
    const ten = req.query.ten;
    return res.render('admin/updatekhachhang',{
        'id' : id,
        'ten': ten
    });
})

  router.post('/updatekhachhang', async (req,res) =>{
    const id= req.body.id;
    const ten= req.body.ten;
    const sdt= req.body.sdt;
    const cmnd= req.body.cmnd;
    const diachi= req.body.diachi;
    let result = await quanlykhachhang.suathongtinkhachhang(id,ten,sdt,cmnd,diachi);

    if(result.err){
      res.send('Unble to updatekhacchang');
      console.error("ERROR Update: ", JSON.stringify(err,null,2));
      return;
    }
  
     return res.redirect('./quanlykhachhang');
  })

module.exports = router;