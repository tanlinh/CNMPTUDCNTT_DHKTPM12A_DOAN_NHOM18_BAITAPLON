var express = require('express');
var url = require('url');
var getDichVu = require('../model/getDichVu');
var getKhachHang= require("../model/getKhachHang");
var router = express.Router();

/* GET home page. */
  router.get('/vantinsodu', async(req, res) =>{
    const sodu = await getKhachHang.getSoDuByID("ND001");
    const thanhtoan = await getKhachHang.getThanhToanById("ND001");
    return res.render("vantinsodu",{sodu:sodu,thanhtoan:thanhtoan}); 
  });
  router.get('/lichsugiaodich', async (req, res) => {
    const lichsu = await getKhachHang.getLichSuById("ND001");
    return res.render('lichsugiaodich',{lichsu:lichsu.lichsu});
  });
  router.get('/naptien', async (req, res) => {
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let id = data.id;
    let ten = data.ten;
    const dichvu = await getDichVu.getTenDichVu();
    const sodu = await getKhachHang.getSoDuByID(id);
    const thanhtoan = await getKhachHang.getThanhToanById(id);
    const lichsu = await getKhachHang.getLichSuById(id);
    console.log("lich su = "+JSON.stringify(lichsu));
    const sotiennap = await getKhachHang.getSoTienNapByID(id);
    console.log("lich su = "+sotiennap);
    return res.render('naptien',{lichsu:lichsu.lichsu,sodu:sodu,thanhtoan:thanhtoan,dichvu:dichvu.data.Items,sotiennap:sotiennap,ten:ten,id:id});
  });
  router.get('/savenaptien', async (req, res) => {
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let sotien = data.sotien;
    let id = data.id;
    let ten = data.ten;
   await getKhachHang.napTien(id,String(ten),sotien);
    return res.redirect(`/naptien?id=${id}&ten=${ten}`);
  });
module.exports = router;
