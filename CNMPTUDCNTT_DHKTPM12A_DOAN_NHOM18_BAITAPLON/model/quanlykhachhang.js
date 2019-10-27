const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = class {

    static async getkhachhang(){
        let params = {
            TableName: 'KhachHang',
          }
          let result = {};
      
          await docClient.scan(params).promise()
          .then((data) => {
            result.data = data;
          }).catch((err) => {
            console.error('Eroors', JSON.stringify(err, null, 2));
            result.err = err;
          })
          return result;
        };
          //xóa khách hàng
    
          static async deletekhachhang(id,ten){
            let params = {
              TableName: "KhachHang",
              Key: {
                'id': id,
                'ten': ten
              }
            }
            let result = {};
            await docClient.delete(params).promise()
            .then((data) =>{
              result.data = data;
            }).catch((err) =>{
              result.err = err;
              console.error("Error", JSON.stringify(err, null, 2));
            })
        
            return result;
          }
          
          static async suathongtinkhachhang(id,ten,sdt,cmnd,diachi){
            let params = {
              TableName: "KhachHang",
              Key: {
                'id': id,
                'ten': ten
              },
                UpdateExpression : 'SET #sdt = :sdt, #cmnd = :cmnd, #diachi = :diachi',
                ExpressionAttributeNames: {
                  '#sdt' : 'sdt',
                  '#cmnd': 'cmnd',
                  '#diachi': 'diachi'
                },
                ExpressionAttributeValues:{
                  ':sdt': sdt,
                  ':cmnd': cmnd,
                  ':diachi': diachi
                },
              }
              let result = {};
              await docClient.update(params).promise()
              .then((data) => {
                result.data = data;
              }).catch((err) =>{
                result.err = err;
                console.error("Error", JSON.stringify(err, null, 2));
              })
              return result;
           }   

}       