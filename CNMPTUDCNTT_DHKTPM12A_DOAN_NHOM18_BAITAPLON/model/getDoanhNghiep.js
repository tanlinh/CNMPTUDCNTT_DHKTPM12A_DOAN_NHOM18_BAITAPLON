const aws = require('aws-sdk');
aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
module.exports = class {
    static async getDoanhNghiepbyID(id) {
        let params = {
            TableName: "khachhangdoanhnghiep"

        }
        params.ProjectionExpression = "ten";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'iddn',
        };
        let querydoanhnghiep = {};
        params.ExpressionAttributeValues = {
            ':id': String(id)
        };
        await docClient.query(params).promise().then((data) => {
            querydoanhnghiep.data = data;
        })
        // console.log(querydoanhnghiep.data.Items);
        return querydoanhnghiep.data.Items;
    }
    static async getDoanhNghiepbyDichVu(idDV) {
        let params = {
            TableName: "ChiTietDichVu"

        }
        let queryDoanhNghiepByDichVu = {};
        let lsiddn = {};
        var querydoanhnghiep = [];
        await docClient.scan(params).promise().then((data) => {
            queryDoanhNghiepByDichVu.data = data;
            let temp = [];
            queryDoanhNghiepByDichVu.data.Items.forEach((ctdv) => {
                if (String(ctdv.iddv) === String(idDV)) {
                    temp.push(ctdv.iddn);
                };
            });
            lsiddn = temp;
            // lsiddn.forEach(function(item, index, array){
            //     const dn =await this.getDoanhNghiepbyID(item);
            //     let temp = [];
            //     dn.forEach((dn) => {
            //         // console.log(dn.ten);
            //         temp.push(String(dn.ten));
            //     });

            //    // console.log(temp);
            //     querydoanhnghiep = temp;
            //     console.log(querydoanhnghiep);
            // });
            //console.log(querydoanhnghiep);
        });

         console.log(lsiddn);
        // console.log(querydoanhnghiep);
        return lsiddn;
    }
    static async getTenDoanhNghiep(lsiddn) {
        let tendn=[];
        let dn1 = {};
        lsiddn.forEach((lss)=>{
            let params = {
                TableName: "khachhangdoanhnghiep"
    
            }
            params.ProjectionExpression = "ten";
            params.KeyConditionExpression = '#id = :id';
            params.ExpressionAttributeNames = {
                '#id': 'iddn',
            };
            let querydoanhnghiep = {};
            let temp = [];
            params.ExpressionAttributeValues = {
                ':id': String(lss)
            };
            docClient.query(params, (err, data)=>{
                querydoanhnghiep.data=data;
               // console.log(querydoanhnghiep.data.Items);
                querydoanhnghiep.data.Items.forEach((ls)=>{
                    temp.push(ls.ten);
               
                });
               console.log(temp);
            });
            console.log(temp);
            
        });
        //console.log(tendn);
       

    
       
    }

}
