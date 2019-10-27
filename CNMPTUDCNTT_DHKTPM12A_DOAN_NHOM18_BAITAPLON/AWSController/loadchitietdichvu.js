const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
  
    region: "us-west-2",
    endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
let allChiTietDichVu = JSON.parse(fs.readFileSync(__dirname + '/chitietdichvu.json', 'utf-8'));
allChiTietDichVu.forEach((ctdv) => {

    let params = {
        TableName: "ChiTietDichVu",
        Item: {
            "id": ctdv.id,
            "iddn": ctdv.iddn,
            "iddv": ctdv.iddv,
            "khachhang": ctdv.khachhang
        }
    };


    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add ChiTietDichVu ${ctdv.title}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`ChiTietDichVu created ${ctdv.id}`);
        }
    });

});