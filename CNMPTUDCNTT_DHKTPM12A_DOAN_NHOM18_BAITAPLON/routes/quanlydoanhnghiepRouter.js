var express = require('express');
var router = express.Router();
var quanlydoanhnghiep = require('../model/quanlydoanhnghiep'); 
var danhsachkhachhang = require('../model/danhsachkhachhangdoanhnghiep');
router.get('/admin1', async (req, res) => {
    const qldn = await quanlydoanhnghiep.getdoanhnghiep();
    return res.render('admin/indexAdmin1',{"qldn":qldn.data.Items});
  })


  //controller tim kiem
  router.get('/search', async (req, res) => {
    const iddn = req.query.iddn;
    const qldn = await quanlydoanhnghiep.searchdoanhnghiep(iddn);
    if (qldn.err) {
      res.end("error: Nothing to show...");
      console.log('ERROR ', JSON.stringify(err, null, 2));
      return;
    }
    return res.render('admin/indexAdmin1',{

      "qldn": qldn.data.Items,
      "iddn": iddn
    }
    );
    
  });

  //controller update doanh nghiep
  router.get('/updatedoanhnghiep' ,async (req, res) =>{
      const iddn = req.query.iddn; 
      const ten = req.query.ten;
      return res.render('admin/updatedoanhnghiep',{
          'iddn' : iddn,
          'ten': ten
      });
  })

  router.post('/updatedoanhnghiep', async (req,res) => {
    const iddn = req.body.iddn; 
    const ten = req.body.ten;
    const sdt = req.body.sdt;
    const fax = req.body.fax;
    const diachi = req.body.diachi;
    const email =req.body.email;
    const result = await quanlydoanhnghiep.suathongtindoanhnghiep(iddn,ten,email,sdt,fax,diachi);
  
   if(result.err){
    res.send('Unble to update doanh nghiệp');
    console.error("ERROR Update: ", JSON.stringify(err,null,2));
    return;
  }

   return res.redirect('./admin1');
  })

  //controller delete doanh nghiệp
  router.get('/deletedoanhnghiep', async (req, res) =>{
    const {iddn, ten} = req.query;
    let result = await quanlydoanhnghiep.deletedoanhnghiep(iddn,ten);
  
    if(result.err){
      res.send('Unble to delete ');
      console.error("ERROR Delete: ", JSON.stringify(err,null,2));
      return;
    }
  
    return res.redirect('./admin1');
  })

  router.get('/xemdanhsachkhachhang', async(req, res) =>{
       const iddn = req.body.iddn;
      const danhsachkhachhangdoanhnghiep = danhsachkhachhang.danhsachkh(iddn);
    return res.render('admin/xemdanhsachkhachhang',{"DS":danhsachkhachhangdoanhnghiep.data});
  })

module.exports = router;
