const aws = require('aws-sdk');
const doanhnghiep = require('../model/getDoanhNghiep');
aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
module.exports = class {

    static async danhsachkh(id,iddv) {
        let params = {
            TableName: "ChiTietDichVu"
        }
        let queryKhachHang = {};
        params.ProjectionExpression = "ChiTietDichVu";
        params.KeyConditionExpression = '#id = :id','#iddv = :iddv';
        params.ExpressionAttributeNames = {
            '#id': 'id',
            '#iddv': 'iddv'
        };
        params.ExpressionAttributeValues = {
            ':id': id,
            ':iddv': iddv
        };
        var temp = {};
        await docClient.query(params).promise().then((data) => {
            queryKhachHang.data = data;
            var lichsu = queryKhachHang.data.Items;
            var i = 0;
            lichsu.forEach((ls) => {
                temp = ls;
            });

        })
        console.log(temp);
        return temp;
    }


}