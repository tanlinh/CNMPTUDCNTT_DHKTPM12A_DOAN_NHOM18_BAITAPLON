const aws = require('aws-sdk');
aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
let doanhnghiep = require('../model/getDoanhNghiep');
module.exports = class {
    static async getHoaDon(iddv, iddn, idkh, idhd) {
        let params = {
            TableName: "ChiTietDichVu"

        }
        let queryhd = {};
        let querydoanhnghiep = {};
        await docClient.scan(params).promise().then((data) => {
            querydoanhnghiep.data = data;
            var kh = {};
            querydoanhnghiep.data.Items.forEach((ctdv) => {
                if (ctdv.iddv === iddv && ctdv.iddn === iddn) {
                    kh = ctdv.khachhang;
                }
            });
            var lshd = {};
            kh.forEach((kh) => {
                if (String(kh.id) === String(idkh)) {
                    lshd = kh.hoadon;
                }
            });
           
            if (String(JSON.stringify(lshd))==="{}") {
                console.error("Không tìm thấy khách hàng");
                queryhd=1;
             } else {

                var hd = {};
                lshd.forEach((temp) => {
                    if (String(temp.id) === String(idhd)) {
                        hd = temp;
                    }
                })
                if (String(JSON.stringify(hd)) === "{}") {
                    console.error("Không tìm thấy hóa đơn");
                    queryhd=2;
                } else if(Number(hd.trangthai)===0){
                    console.error("Hóa đơn này đã thanh toán");
                    queryhd=3;
                }else{
                    queryhd = hd;
                }
            }
        });
        return queryhd;
    }
    // static async updateHD() {
    //     let iddv="DV001";
    //     let iddn="DN001"
    //     let params = {
    //         TableName: "ChiTietDichVu"

    //     }
    //     let idctdv = {};
    //     let querydoanhnghiep = {};
    //     await docClient.scan(params).promise().then((data) => {
    //         querydoanhnghiep.data = data;
    //         querydoanhnghiep.data.Items.forEach((temp)=>{
    //             if(temp.iddn===iddn&&temp.iddv===iddv){
    //                 idctdv=temp.id;
    //             }
    //         })
    //     })
    //     let params1 = {
    //         TableName: "ChiTietDichVu"

    //     }
    //     params.ProjectionExpression = "khachhang";
    //     params.KeyConditionExpression = '#id = :id';
    //     params.ExpressionAttributeNames = {
    //         '#id': 'id',
    //     };
    //     let queryctdv = {};
    //     params.ExpressionAttributeValues = {
    //         ':id': String(idctdv)
    //     };
    //     await docClient.query(params1).promise().then((data) => {
    //         queryctdv.data = data;
    //     })
    //     console.log(queryctdv.data.Items);
    // }

}
