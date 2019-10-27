const aws = require('aws-sdk');
const doanhnghiep = require('../model/getDoanhNghiep');
aws.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
module.exports = class {
    static async getKhachHangById(idKH) {
        let params = {
            TableName: "KhachHang"

        }
        let queryKhachHang = {};
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        params.ExpressionAttributeValues = {
            ':id': String(idKH)
        };
        await docClient.query(params).promise().then((data) => {
            queryKhachHang.data = data;
            //console.log(JSON.stringify(queryKhachHang));
        })
        return queryKhachHang;
    }
    static async getKhachHang() {
        let params = {
            TableName: "KhachHang",
        }
        let scanKhachHang = {};
        params.ProjectionExpression = "sodu"
        await docClient.scan(params).promise().then((data) => {
            scanKhachHang.data = data;
            // console.log(JSON.stringify(scanKhachHang.data.Items));
        })
        return scanKhachHang;
    }
    static async getThanhToanById(idKH) {
        let params = {
            TableName: "KhachHang"

        }
        let queryKhachHang = {};
        params.ProjectionExpression = "lichsu";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        params.ExpressionAttributeValues = {
            ':id': String(idKH)
        };
        var tong = 0;
        await docClient.query(params).promise().then((data) => {
            queryKhachHang.data = data;
            console.log(queryKhachHang.data.Items)
            var lichsu = queryKhachHang.data.Items;
            var i = 0;
            var temp = {};
            lichsu.forEach((ls) => {
                //console.log(ls+"222222222222222222222222222222222222222")
                temp = ls;
            });
           // console.log(temp);
            temp.lichsu.forEach((temp) => {
                console.log(temp);
                i = i + 1;
                tong = tong + Number.parseFloat(temp.sotien);
                console.log("//");
            });
            console.log(tong);
        })
        return tong;
    }
    static async getSoDuByID(idKH) {
        let params = {
            TableName: "KhachHang"

        }
        let querysodu = {};
        params.ProjectionExpression = "sodu";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        params.ExpressionAttributeValues = {
            ':id': String(idKH)
        };
        var sodu = 0;
        await docClient.query(params).promise().then((data) => {
            querysodu.data = data;
            querysodu.data.Items.forEach((st) => {
                sodu = st.sodu;
            })
        });
        return sodu;
    }
    static async getLichSuById(idKH) {
        let params = {
            TableName: "KhachHang"

        }
        let queryKhachHang = {};
        params.ProjectionExpression = "lichsu";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        params.ExpressionAttributeValues = {
            ':id': String(idKH)
        };
        var temp = {};
        await docClient.query(params).promise().then((data) => {
            queryKhachHang.data = data;
            var lichsu = queryKhachHang.data.Items;
            var i = 0;
            lichsu.forEach((ls) => {
                temp = ls;
            });

        })
        console.log(temp);
        return temp;
    }
    static async napTien(idKH, ten, sotien) {
        var tiencu = await this.getSoDuByID(idKH);
        var tienmoi = Number(tiencu) + Number(sotien);
        var tiennap = Number(await this.getSoTienNapByID(idKH)) + Number(sotien)
        let params1 = {
            TableName: 'KhachHang',
            Key: {
                "id": String(idKH),
                "ten": String(ten)
            },
            UpdateExpression: "set #st = :st, #stn = :stn",
            ExpressionAttributeNames: {
                '#st': 'sodu',
                '#stn': 'sotiennap'
            },
            ExpressionAttributeValues: {
                ':st': Number(tienmoi),
                ':stn': Number(tiennap)
            },
        };
        await docClient.update(params1).promise().then((data) => {

        });
    }
    static async getSoTienNapByID(idKH) {
        let params = {
            TableName: "KhachHang"

        }
        let querysotiennap = {};
        params.ProjectionExpression = "sotiennap";
        params.KeyConditionExpression = '#id = :id';
        params.ExpressionAttributeNames = {
            '#id': 'id',
        };
        params.ExpressionAttributeValues = {
            ':id': String(idKH)
        };
        var sotiennap = 0;
        await docClient.query(params).promise().then((data) => {
            querysotiennap.data = data;
            querysotiennap.data.Items.forEach((st) => {
                sotiennap = st.sotiennap;
            })
            console.log(sotiennap);
        });
        return sotiennap;
    }
    static async thanhToan(idKH,iddv, tendv, sotien, idhd, iddn, idkhht) {
        let dntemp = await doanhnghiep.getDoanhNghiepbyID(iddn);
        let tendntemp;
        dntemp.forEach((temp) => {
            tendntemp = temp.ten;
        })
        var d = new Date();
        var n = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
        let tendvtemp = '"tendv":' + '"' + tendv + '"';
        let kh = await this.getKhachHangById(idkhht);
        let tenKHHT;
        kh.data.Items.forEach((kh) => {
            tenKHHT = kh.ten;
        })
        //lấy tên khách hàng trong chi tiết dịch vụ
        let tenkhtemp;
        let params = {
            TableName: "ChiTietDichVu"

        }
        let querydoanhnghiep = {};
        await docClient.scan(params).promise().then((data) => {
            querydoanhnghiep.data = data;
            var kh = {};
            querydoanhnghiep.data.Items.forEach((ctdv) => {
                if (ctdv.iddv === iddv && ctdv.iddn === iddn) {
                    kh = ctdv.khachhang;
                }
            });
            kh.forEach((kh) => {
                if (String(kh.id) === String(idKH)) {
                    tenkhtemp = kh.ten;
                }
            });
        })
        console.log(tenkhtemp);
       //------------------------------------------//s
        let tenkh = '"tenkh":' + '"' + tenkhtemp + '"';
        let idhdtemp = '"idhd":' + '"' + idhd + '"';
        let ngaylap = '"ngaylap":' + '"' + n + '"';
        let tendn = '"tendn":' + '"' + tendntemp + '"';
        let sotientemp = '"sotien":' + sotien;
        console.log(sotientemp)
        let lichsu = '{' + tendvtemp + ',' + idhdtemp + ',' + ngaylap + ',' + tendn + ',' + tenkh + ',' + sotientemp + '}'
        console.log(lichsu)
        let lstemp = [JSON.parse(lichsu)];

        let params1 = {
            TableName: "KhachHang",
            Key: {
                "id": String(idkhht),
                "ten": String(tenKHHT)
            },
            UpdateExpression: "SET lichsu = list_append(lichsu, :lichsu)",
            ExpressionAttributeValues: {
                ":lichsu": lstemp
            },
            ReturnValues: "ALL_NEW"
        };
        await docClient.update(params1).promise().then(async (data) => {
            var tiencu = await this.getSoDuByID(idkhht);
            if (Number(tiencu) >= Number(sotien)) {
                var tienmoi = Number(tiencu) - Number(sotien);
                let params1 = {
                    TableName: 'KhachHang',
                    Key: {
                        "id": String(idkhht),
                        "ten": String(tenKHHT)
                    },
                    UpdateExpression: "set #st = :st",
                    ExpressionAttributeNames: {
                        '#st': 'sodu',
                    },
                    ExpressionAttributeValues: {
                        ':st': Number(tienmoi)
                    },
                };
                await docClient.update(params1).promise().then((err) => {
                });

            } else {
                console.log("Error");
            }

        })


    }
}
