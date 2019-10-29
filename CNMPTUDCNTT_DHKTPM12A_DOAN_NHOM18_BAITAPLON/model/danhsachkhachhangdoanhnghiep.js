const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
//lấy thông tin khách hàng theo chitietdichvu
module.exports = class {
    static async getDSKhachHangByDV(iddv, iddn) {
        let params = {
            TableName: "ChiTietDichVu"
        }
        let queryCTDichVu = {}
        let listkh = {};
        await docClient.scan(params).promise().then((data) => {
            queryCTDichVu.data = data;
            console.log(JSON.stringify(queryCTDichVu.data.Items));
        })
        queryCTDichVu.data.Items.forEach((temp) => {
                if (temp.iddv === iddv && temp.iddn === iddn) {
                    listkh = temp.khachhang
                }
            })
        return listkh;
    }

}