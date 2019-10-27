const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');

let allKhachHang = JSON.parse(fs.readFileSync(__dirname + '/khachhangnew.json', 'utf-8'));
let khachhang = require('../AWSController/khachhangnew.json');
// allDichVu.forEach((dichvu) => {
//     let doanhnghiep = dichvu.doanhnghiep;

//     let params = {
//         TableName: "DichVu",
//         Item: {
//             "id": dichvu.id,
//             "ten": dichvu.ten,
//         }
//     };


//     docClient.put(params, (err, data) => {
//         if (err) {
//             console.error(`Unable to add DichVu ${dichvu.title}, ${JSON.stringify(err, null, 2)}`);
//         } else {
//             console.log(`DichVu created ${dichvu.ten}`);
//         }
//     });

// });
khachhang.forEach((kh) => {

    let params = {
        TableName: "KhachHang",
        Item: {
            "id": kh.id,
            "matkhau": kh.matkhau,
            "ten": kh.ten,
            "chucvu": kh.chucvu,
            "sdt": kh.sdt,
            "cmnd": kh.cmnd,
            "diachi": kh.diachi,
            "sodu": kh.sodu,
            "sotiennap": kh.sotiennap,
            "lichsu": kh.lichsu
        }
    };


    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add DichVu ${kh.title}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`KhachHang created ${kh.ten}`);
        }
    });

});
// allChiTietDichVu.forEach((ctdv) => {

//     let params = {
//         TableName: "ChiTietDichVu",
//         Item: {
//             "id": ctdv.id,
//             "iddn": ctdv.iddn,
//             "iddv": ctdv.iddv,
//             "khachhang": ctdv.khachhang
//         }
//     };


//     docClient.put(params, (err, data) => {
//         if (err) {
//             console.error(`Unable to add ChiTietDichVu ${ctdv.title}, ${JSON.stringify(err, null, 2)}`);
//         } else {
//             console.log(`ChiTietDichVu created ${ctdv.id}`);
//         }
//     });

// });
// allDoanhNghiep.forEach((dn) => {

//     let params = {
//         TableName: "DoanhNghiep",
//         Item: {
//             "id": dn.id,
//             "matkhau": dn.matkhau,
//             "ten":dn.ten,
//             "chucvu": dn.chucvu,
//             "sdt": dn.sdt,
//             "fax": dn.fax,
//             "email": dn.email,
//             "diachi": dn.diachi
//         }
//     };


//     docClient.put(params, (err, data) => {
//         if (err) {
//             console.error(`Unable to add DoanhNghiep ${dn.title}, ${JSON.stringify(err, null, 2)}`);
//         } else {
//             console.log(`DoanhNghiep created ${dn.id}`);
//         }
//     });

// });
