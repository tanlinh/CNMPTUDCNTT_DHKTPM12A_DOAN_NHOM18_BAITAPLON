const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
module.exports = class {

    static async getdoanhnghiep(){
        let params = {
            TableName: 'khachhangdoanhnghiep',
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
          //tìm kiếm doanh nghiệp theo id
        static async searchdoanhnghiep(iddn) {
          let params = {
            TableName: 'khachhangdoanhnghiep',
            KeyConditionExpression: '#i = :iddn',
            ExpressionAttributeNames : {
              '#i': 'iddn'
            },
            ExpressionAttributeValues : {
              ':iddn': String(iddn)
            }
          };
      
          let result = {};
      
          await docClient.query(params).promise()
          .then((data) =>{
            result.data = data;
          }).catch((err) => {
            console.error('error', JSON.stringify(err, null, 2));
            result.err = err;
          })
            return result;
        }

        //sửa thông tin doanh nghiệp
     static async suathongtindoanhnghiep(iddn,ten,email,sdt,fax,diachi){
      let params = {
        TableName: "khachhangdoanhnghiep",
        Key: {
          'iddn': iddn,
          'ten': ten
        },
          UpdateExpression : 'SET #email = :email, #sdt = :sdt, #fax = :fax, #diachi = :diachi',
          ExpressionAttributeNames: {
            '#email': 'email',
            '#sdt' : 'sdt',
            '#fax': 'fax',
            '#diachi': 'diachi'
          },
          ExpressionAttributeValues:{
            ':email': email,
            ':sdt': sdt,
            ':fax': fax,
            ':diachi': diachi
          },
          ReturnValues:"UPDATED_NEW"
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
      //xóa thông tin doanh nghiệp

      static async deletedoanhnghiep(iddn, ten){
        let params = {
          TableName: "khachhangdoanhnghiep",
          Key: {
            'iddn': iddn,
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
}

