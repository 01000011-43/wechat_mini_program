var mysql = require('mysql');

//配置数据库
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'******',
	password:'*****',
	database:'*****'
});
connection.connect();


//获取代跑跑腿界面内容——校内
function getErrands(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `select * from errandin`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

//获取代跑跑腿界面内容——校外
function getErrandsout(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM errandout`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

//获取二手商城界面
function getShop(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM shop`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function getLost(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM lost`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function getConfession(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM confession ORDER BY id DESC`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function insertConfession(req,res){
    let promise = new Promise((resolve,reject)=>{
        let text=req.query.text;
        let type = req.query.type;
        let sql =  `INSERT INTO confession (content,type) VALUES ('${text}','${type}')`;
            db_operate(sql).then((res1)=>{
            console.log('db_getERS res1.data[0]',res1.data);
            resolve(res1);
            })
    })
    return promise;
}

function getTeam(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM team ORDER BY id DESC`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function insertTeam(req,res){
    let promise = new Promise((resolve,reject)=>{
        let text=req.query.text;
        let sql =  `INSERT INTO team (content) VALUES ('${text}')`;
            db_operate(sql).then((res1)=>{
            console.log('db_getERS res1.data[0]',res1.data);
            resolve(res1);
            })
    })
    return promise;
}

function getJob(req,res){
    let promise = new Promise((resolve,reject)=>{
        let sql =  `SELECT * FROM job ORDER BY id DESC`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function getProfile(req,res){
    let promise = new Promise((resolve,reject)=>{
        let openid = req.query.openid;
        let sql =  `select * from newuser where openid='${openid}'`;
            db_operate(sql).then((res1)=>{
            resolve(res1);
            })
    })
    return promise;
}

function insertProfile(req,res){
    let promise = new Promise((reslove,reject)=>{
        let openid = req.query.openid;
        let tel = req.query.tel;
        let email = req.query.email;
        let type = req.query.type;
        let sql  = `update newuser set email = '${email}' where openid = '${openid}'`;
        let sql2 = `update newuser set tel = '${tel}' where openid = '${openid}'`;
        if(type =='tel'){
            db_operate(sql2).then((res1)=>{
                resolve(res1);
            })
        }
        if(type == 'email'){
            db_operate(sql).then((res1)=>{
                resolve(res1);
            })
        }
    })
    return promise;
}

function db_operate(sql){
    let promise = new Promise((resolve,reject)=>{
        var result = {
        "status": "200",
        "success": true,
    }
    connection.query(sql,function(err,rows){
        if(err) throw err;
        result.data=rows;
        resolve(result);
    })
    })
    return promise;
}


module.exports={
	getErrands,
    getErrandsout,
    getShop,
    getLost,
    getConfession,
    insertConfession,
    getTeam,
    insertTeam,
    getJob,
    getProfile,
    insertProfile,
};
