const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region:"us-west-2",
  endpoint: "http://localhost:8000" 

});
const docClient = new aws.DynamoDB.DocumentClient();
//clsconst DATA_FILE = "./khachhang.json"
//let dichvu = require('../AWSController/khachhang.json');
let dichvu = require('../AWSController/dichvu.json');
dichvu.forEach((kh) =>{
//  const dichvu = ;
  
  let params = {
    TableName: "DichVu",
    Item: {
      "id" : kh.id,
      "ten" : kh.ten
    }
}

  docClient.put(params, (err, data) =>{
    if(err){
      console.error(`Unable to add dichvu ${kh.ten}, ${JSON.stringify(err, null, 2)}`); 
    }else{
      console.log(`dichvu created ${kh.ten}`); 
    }
  })
})