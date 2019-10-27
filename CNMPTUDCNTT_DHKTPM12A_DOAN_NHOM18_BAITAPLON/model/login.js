const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

  var login = {
    checkLogin : function(req,res){
        let id = req.body.id;
        let matkhau = req.body.matkhau;
        let loginErr = 0;


        // router.get('/logout',function(req, res){
        //     res.cookie("id",id);
        //     res.cookie("matkhau",ma)
        //     res.redirect('./');
        //   })

        //đăng nhập của admin
        if(id == "admin" && matkhau == "admin"){
            res.redirect('/admin1');
        }
        //đăng nhập của khách hàng
        const params = {
            TableName: 'KhachHang',
        };

        docClient.scan(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            }
            else{
                const paramsdoanhnghiep = {
                    TableName: 'khachhangdoanhnghiep',
                };
                docClient.scan(paramsdoanhnghiep, function(err, data){
                    var Khachhangdn = data.Items.filter(function (item) {

                        return item.iddn == id && item.matkhau == matkhau;
                    
                    });
                    if (Khachhangdn.length > 0)  { //kiểm tra có tài khoản và password
                        res.render('doanhnghiep/indexdoanhnghiep',{"DN": Khachhangdn});
                   }
                    else{
                    loginErr = 1;
                    res.render('dangnhap',{loginErr});  
                }
                }); 
                var Khachhang = data.Items.filter(function (item) {
                    return item.id == id && item.matkhau == matkhau;
                });

                if (Khachhang.length > 0)  { //kiểm tra có tài khoản và password
                     return res.render('indexkhachhang',{"KH": Khachhang, });
                }
              

            }
            
        });

           
        //đăng nhập của doanh nghiệp
      
        // docClient.scan(paramsdoanhnghiep, function(err, data){
           
        //         let Khachhangdoanhnghiep = data.Items.filter(function (item) {
        //             return item.iddn == id && item.matkhau == matkhau;
        //         });
        //            res.render('doanhnghiep/indexdoanhnghiep',{"DN": Khachhangdoanhnghiep});

            
            
        // });
    }
}
module.exports = login;
