const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region:"us-west-2",
  endpoint: "http://localhost:8000",

});
const docClient = new aws.DynamoDB.DocumentClient();
//clsconst DATA_FILE = "./khachhang.json"
let khachhang = require('../AWSController/khachhang.json');
let dichvu = require('../AWSController/dichvu.json');
khachhang.forEach((kh) =>{
//  const dichvu = ;
  const lichsu = kh.lichsu;
  
  let params = {
    TableName: "Khachhang",
    Item: {
      "id" : kh.id,
      "matkhau" : kh.matkhau,
      "ten" : kh.ten,
      "chucvu": kh.chucvu,
      "sdt" : kh.sdt,
      "cmnd" : kh.cmnd,
      "diachi" : kh.diachi,
      "sodu" : kh.sodu,
      "lichsu" : kh.lichsu
    }
}

  docClient.put(params, (err, data) =>{
    if(err){
      console.error(`Unable to add khachhang ${kh.name}, ${JSON.stringify(err, null, 2)}`); 
    }else{
      console.log(`khachhang created ${kh.ten}`); 
    }
  })
})