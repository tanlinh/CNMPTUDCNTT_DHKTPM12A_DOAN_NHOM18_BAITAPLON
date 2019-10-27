const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
//module.exports = class {
     exports.getdichvu =  async (req,res ,next) =>{
        let params = {
          TableName: 'DichVu',
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

      
   



// exports.getdichvu = async(req, res, next) => {
//   var product_params = {
//     TableName: "DichVu"
//   };
//   var result = {};
//   docClient.scan(product_params, function(err, data){
//       if (err) {
//           console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//       }else{
//           result.data = data;
//       }
//       return result;
//   });
  
