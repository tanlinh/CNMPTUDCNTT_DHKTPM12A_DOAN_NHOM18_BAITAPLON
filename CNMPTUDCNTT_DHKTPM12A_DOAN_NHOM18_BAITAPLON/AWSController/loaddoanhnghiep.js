const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region:"us-west-2",
  endpoint: "http://localhost:8000",

});
const docClient = new aws.DynamoDB.DocumentClient();
//clsconst DATA_FILE = "./khachhang.json"
let doanhnghiep = require('../AWSController/khachhangdoanhnghiep.json');

doanhnghiep.forEach((kh) =>{

  
  let params = {
    TableName: "khachhangdoanhnghiep",
    Item: {
      "iddn" : kh.id,
      "matkhau" : kh.matkhau,
      "ten" : kh.ten,
      "chucvu": kh.chucvu,
      "sdt" : kh.sdt,
      "fax" : kh.fax,
      "email" : kh.email,
      "diachi" : kh.diachi
    }
}

  docClient.put(params, (err, data) =>{
    if(err){
      console.error(`Unable to add doanhnghiep ${kh.name}, ${JSON.stringify(err, null, 2)}`); 
    }else{
      console.log(`doanhnghiep created ${kh.ten}`); 
    }
  })
})