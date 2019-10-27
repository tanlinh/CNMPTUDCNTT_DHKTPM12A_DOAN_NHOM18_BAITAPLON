const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "KhachHang"
};
console.log('Scanning Khachhang table.');

docClient.scan(params, onScan);
function onScan(err, data) {
  if (err) {
    console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Scan succeeded.');
    data.Items.forEach((kh) => {
      console.log(JSON.stringify(kh) + "\n");
      //console.info(kh);
    });

    if (typeof data.LastEvaluatedKey !== 'undefined') {
      console.log('Scanning for more...');
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    }
  }
}
