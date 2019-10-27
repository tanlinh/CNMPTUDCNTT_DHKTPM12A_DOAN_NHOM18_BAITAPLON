const aws = require('aws-sdk');
aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
// let Dichvu = {
    // loadTenDichVu :function(req,res){
    //     let params = {
    //         TableName: "DichVu",
    //         ProjectionExpression:"ten"
    //     };
    //     scanTenDichVu={
        
    //     };
    //     docClient.scan(params, (err, data) => {
    //         if (err) {
    //             scanTenDichVu.err = err;
    //         } else {
    //             scanTenDichVu.data = data;
               
    //         }
    //         console.log(scanTenDichVu.data.Items);
    //         return scanTenDichVu.data.Items;
    //     });
       
    // }
   
//module.exports=Dichvu;

module.exports = class {
    static async getTenDichVu(){
        let params = {
            TableName: "DichVu",
            ProjectionExpression:"id,ten,doanhnghiep"
        }
        let scanTenDichVu = {};        
           
        await docClient.scan(params).promise().then((data)=>{
            scanTenDichVu.data = data;
            console.log(JSON.stringify(scanTenDichVu.data.Items));
        })
        return scanTenDichVu;
    }
    static async getTenDichVuByID(iddv){
        let params = {
            TableName: "DichVu",
        }
        params.ProjectionExpression = "ten";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        let querydichvu = {};
        params.ExpressionAttributeValues = {
            ':id': String(iddv)
        };      
           
        await docClient.query(params).promise().then((data)=>{
            querydichvu.data = data;
        })
        console.log(JSON.stringify(querydichvu.data.Items));
        return querydichvu;
    }
}
