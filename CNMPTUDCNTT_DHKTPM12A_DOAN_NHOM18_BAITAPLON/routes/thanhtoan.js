var express = require('express');
var getDichVu = require('../model/getDichVu');
var getDoanhNghiep = require('../model/getDoanhNghiep');
const hoadon = require('../model/getHoaDon');
const khachhang = require('../model/getKhachHang')
var url = require('url');
var router = express.Router();

/* GET home page. */
// router.get('/thanhtoan', async(req, res) =>{
//   let urlObject = url.parse(req.url, true);
//   let data = urlObject.query;
//   let id = data.iddv;
//   let idnd=data.idnd
//   let ten = data.ten
//   let madn = data.doanhnghiep;  
//   let makh = data.makh;
//   let mahd = data.mahd;
//   let dv = await getDichVu.getTenDichVuByID(id);
//   let hd = await hoadon.getHoaDon(id,madn,makh,mahd);
//   console.log(id);
//   // if(hd===1){
//   //   return res.render('khachhangerror');
//   // }else if(hd===2){
//   //   return res.render('hoadonerror');
//   // }else if(hd===3){
//   //   return res.render('thanhtoanerror');
//   // }
//   return res.render("finishthanhtoan",{madn:madn,makh:makh,hd:hd,dv:dv,idnd:idnd,ten:ten,id:id});
//   });
router.get('/thanhtoannext', async(req, res) =>{
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let id = data.iddv;
    let idnd=data.idnd
    let ten = data.ten
    let madn = data.doanhnghiep;  
    let makh = data.makh;
    let mahd = data.mahd;
    let dv = await getDichVu.getTenDichVuByID(id);
    let hd = await hoadon.getHoaDon(id,madn,makh,mahd);
    return res.render("finishthanhtoan",{madn:madn,makh:makh,hd:hd,dv:dv,idnd:idnd,ten:ten,id:id});
    });
  router.get('/thanhtoan', async(req, res) =>{
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let id = data.iddv;
    let idnd=data.idnd
    let ten = data.ten
    let madn = data.doanhnghiep;  
    let makh = data.makh;
    let mahd = data.mahd;
    let hd = await hoadon.getHoaDonByKH(id,madn,makh);
    if(hd===1){
      return res.render('khachhangerror');
    }
    //iddv=<%=id%>
    // &madn=<%=madn%>
    // &makh=<%=makh%>
    // &tendv=<%=dv.ten%>
    // &mahd=<%=hd.id%>
    // &sotien=<%=hd.sotien%>
    // &idnd=<%=idnd%>
    // &ten=<%=ten%>
    return res.render("thanhtoannext",{hd:hd,madn:madn,makh:makh,idnd:idnd,ten:ten,id:id});
    });
  router.post('/dichvu', async(req, res) =>{
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let id = data.id;
    let idnd = data.idnd;
    let ten = data.ten;
    const iddoanhnghiep = await getDoanhNghiep.getDoanhNghiepbyDichVu(id);
    //const doanhnghiep = await getDoanhNghiep.getTenDoanhNghiep(iddoanhnghiep);
    return res.render("thanhtoan",{iddoanhnghiep:iddoanhnghiep,id:id,idnd:idnd,ten:ten});
  });
  router.post('/finishthanhtoan', async(req, res) =>{
    let urlObject = url.parse(req.url, true);
    let data = urlObject.query;
    let iddv = data.iddv;
    //console.log("iddv:"+iddv)
    let madn = data.madn;
    //console.log("madn:"+madn)
    let makh = data.makh;
    //console.log("makh:"+makh)
    let tendv = data.tendv;
    //console.log("tendvtendv:"+tendv)
    let mahd = data.mahd;
    //console.log("mahd:"+mahd)
    let sotien = data.sotien;
    //console.log("sotien:"+sotien)
    let idnd = data.idnd;
    //console.log("idnd:"+idnd)
    let ten = data.ten;
   // console.log("ten:"+ten)
    let kh = await khachhang.thanhToan(makh,iddv,tendv,sotien,mahd,madn,idnd);
    return res.redirect(`/naptien?id=${idnd}&ten=${ten}`);
    // return res.render("naptien")
  });
module.exports = router;
