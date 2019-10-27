const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let dynamodb = new AWS.DynamoDB();

let params2 = {
    TableName: "ChiTietDichVu",
    
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "iddv", AttributeType: "S" }
    ],
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "iddv", KeyType: "RANGE" }
     
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params2, (err, data) => {
    if (err) {
        console.error(`Something went wrong ${JSON.stringify(err, null, 3)}`);
    } else {
        console.log(`Created table ${JSON.stringify(data, null, 3)}`);
    }
});