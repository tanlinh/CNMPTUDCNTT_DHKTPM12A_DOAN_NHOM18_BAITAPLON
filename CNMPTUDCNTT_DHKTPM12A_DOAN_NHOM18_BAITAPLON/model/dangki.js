const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

var dangki = {
    checkdangki: function (req, res) {
        var id = req.body.id;
        var matkhau = req.body.matkhau;
        var ten = req.body.ten;
        var chucvu = 1;
        var sdt = req.body.sdt;
        var cmnd = req.body.cmnd;
        var diachi = req.body.diachi;
        var listdichvu = req.body.listdichvu;
        var id1 = req.body.id1;
        var matkhau1 = req.body.matkhau1;
        var ten1 = req.body.ten1;
        var chucvu1 = 1;
        var sdt1 = req.body.sdt1;
        var diachi1 = req.body.diachi1;
        var listdichvu = req.body.listdichvu;
        var fax1 = req.body.fax1;
        var email1 =req.body.email1;
        let DkiErr = 0;
        
      //  dang ki khach hang
        var params = {
            TableName: 'KhachHang'
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                console.log(`Erorr `, JSON.stringify(err, null, 2));
            }
            else {
                var paramsputs = {
                    TableName: 'khachhangdoanhnghiep'
                };
                docClient.scan(paramsputs, function (err, data) {
        
                            var param = {
                                TableName: 'khachhangdoanhnghiep',
                                Item: {
                                    "iddn": id1,
                                    "matkhau": matkhau1,
                                    "ten": ten1,
                                    "chucvu": 1,
                                    "diachi": diachi1,
                                    "email": email1,
                                    "sdt": sdt1,
                                    "fax": fax1,
                                    "listdichvu": listdichvu
                                }
                            };
                            docClient.put(param, function (err, data) {     
                                if (err) {
                                    res.redirect('./dangnhap');
                                } else {
                                    console.log("Added item:", JSON.stringify(data, null, 2));
                                 res.redirect('./dangnhap');
                                } 
                              
                            });
                });
                // var Khachhang = data.Items.filter(function (item) {
                //     return item.id == id;
                // });
                // if (Khachhang.length > 0) {
                //      DkiErr = 1;
                //      res.render('dangki', {DkiErr});
                // }
                // else {
                    var paramsput = {
                        TableName: 'KhachHang',
                        Item: {
                            "id": id,
                            "matkhau": matkhau,
                            "ten": ten,
                            "chucvu": chucvu,
                            "sdt": sdt,
                            "cmnd": cmnd,
                            "diachi": diachi,
                            "sodu": 0
                        }
                    };
                    docClient.put(paramsput, function (err, data) {
                        if (err) {
                            DkiErr = 1;
                            console.log(`Lỗi: ` + DkiErr);
                            return res.render('dangki');
                        } else {
                            console.log("Added item:", JSON.stringify(data, null, 2));
                            return res.render('dangki');
                        }
                    });
                //}
            }


        });
    }
}


module.exports =dangki;