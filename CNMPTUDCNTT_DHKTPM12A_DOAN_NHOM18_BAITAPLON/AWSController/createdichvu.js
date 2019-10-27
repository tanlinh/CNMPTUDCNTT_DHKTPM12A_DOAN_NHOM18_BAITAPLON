var aws = require('aws-sdk');
var express = require('express');
var router = express.Router();

aws.config.update({
    region:"us-west-2",
    endpoint: "http://localhost:8000"
})

let dynamoDB = new aws.DynamoDB();
let docclient = new aws.DynamoDB.DocumentClient();

let params = {
    TableName: "DichVu",
    KeySchema: [
      {AttributeName: "id", KeyType: "HASH"},
      {AttributeName: "ten", KeyType: "RANGE"}
    ],
    AttributeDefinitions:[
      {AttributeName: "id", AttributeType: "S"},
      {AttributeName: "ten", AttributeType: "S"}
    ],
    ProvisionedThroughput:{
      ReadCapacityUnits: 10,     
      WriteCapacityUnits: 10 
    }
  }

  dynamoDB.createTable(params, (err, data) =>{
    if(err){
      console.error(`CREATE TABLE: Something went wrong ${JSON.stringify(err,null,2)}`); 
    }else{
      console.log(`Created table ${JSON.stringify(data, null, 2)}`); 
    }
  })
  
