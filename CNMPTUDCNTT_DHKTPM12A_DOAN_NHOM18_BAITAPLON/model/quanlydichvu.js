const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = class {

  static async getdichvu() {
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


  static async createdichvu(id, ten) {
    let params = {
      TableName: "DichVu",

      Item: {
        id: String(id),
        ten: String(ten)
      }
    };
    let result = {};
    await docClient.put(params).promise()
      .then((data) => {
        result.data = data;
      }).catch((err) => {
        result.err = err;
        console.error('ERR', JSON.stringify(err, null, 2));
      })

    return result;

  }
}      