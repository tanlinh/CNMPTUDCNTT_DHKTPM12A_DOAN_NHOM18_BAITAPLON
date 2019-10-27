const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

  var login = {
    checkLogindoanhnghiep : function(req,res){
        var id = req.body.id;
        var matkhau = req.body.matkhau;
        let loginErr = 0;

        const params = {
            TableName: 'khachhangdoanhnghiep',
        };
        docClient.scan(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            }
            else{
                var Khachhang = data.Items.filter(function (item) {
                    return item.id == id && item.matkhau == matkhau;
                });
                if (Khachhang.length > 0)  { //kiểm tra có tài khoản và password
                  //  req.session.user = Khachhang[0]; 
                     return res.render('indexkhachhang',{"KH": Khachhang});
                }
                else {
                    loginErr = 1;
                    res.render('dangnhap',{loginErr});  
                }
            }
            
        });
    },
    checkLogindoanhnghiep: function(req,res){

    }
};
module.exports = login;


