const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
const request = require('request');
const querystring = require('querystring');
let https = require("https");
let fs = require("fs");
var mysql = require('mysql');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));


//配置https
const httpsOption = {
    key : fs.readFileSync("./https/***.key"),
    cert: fs.readFileSync("./https/***.pem")
}

//配置服务器端口443
https.createServer(httpsOption, app).listen(443);

//配置数据库
var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'***',
	password:'***',
	database:'***'
});
connection.connect();


//生成token函数
function generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, './rsa_private_key.pem'));//私钥
        let token = jwt.sign({
            data,
            exp: created + 60 * 30,
        }, cert, {algorithm: 'RS256'});
        return token;
}

//通过openid获得uid函数
function getuid(openid){
        let promise = new Promise((resolve,reject)=>{
                let uid = 0
                let sql = `select * from user where openid = '${openid}'`
                connection.query(sql,function(err,rows){
                        if(err) {throw err;}
                        else{
                        console.log(rows);
        //如果有数据
                        if(rows.length>0){
                        console.log('老用户'+rows[0].id)
                                uid = rows[0].id
                                resolve(uid);
                        }else{
                        let sql = `insert into user(openid,datetime) values('${openid}','2020-01-01 20:20:20')`;
                                console.log(sql)
                                connection.query(sql,function(err,rows){
                                if(err){throw err;}
                                        else{
                                        console.log("新用户"+rows.insertId)
                                        uid = rows.insertId
                                        resolve(uid);
                                }
                        });
                        }
                }
        });
})
        return promise;

}


//onLogin请求接口
app.get('/onLogin', (req, res) => { //req是请求，res是响应
          var data = {
            'appid': '****',
            'secret': '***',
            'js_code': req.query.abc, //req是我们请求到的，query是个子对象
            'grant_type': 'authorization_code'
        };
        console.log(data); 
        // querystring的stringify用于拼接查询
        var content = querystring.stringify(data);
        // 根据微信开发者文档给的API
        var url = 'https://api.weixin.qq.com/sns/jscode2session?' + content;
        // 对url发出一个get请求
        request.get({ //request是请求对象，get是他的方法
            'url': url
        }, (error, response, body) => {  //箭头函数，get成功后会执行这个
            // 将body的内容解析出来
           	let result = JSON.parse(body);
		result.code = req.query.abc;
		console.log('result1',result);
		let openid = result.openid;
		getuid(openid).then((res1)=>{
			console.log('res1',res1)
			result.token = generateToken(res1)
			console.log('result2',result)
			res.json(result)
		});
            // 返回JSON格式数据
         })

})

