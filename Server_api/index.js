const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const path = require('path');
const request = require('request');
const querystring = require('querystring');
const token = require('./api_modules/token.js');
const db = require('./api_modules/db.js');
const mysql = require('mysql');
let https = require("https");
let fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));


//配置https
const httpsOption = {
    key : fs.readFileSync("./https/***.key"),
    cert: fs.readFileSync("./https/****.pem")
}

//配置服务器端口443
https.createServer(httpsOption, app).listen(443);

//配置数据库
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'******',
    password:'******',
    database:'*****'
});
connection.connect();

//配置静态资源
app.use(express.static(path.resolve(__dirname,'./public')));


//getcode请求接口
app.get('/getcode', (req, res) => { //req是请求，res是响应

          var data = {
            'appid': '*****',
            'secret': '******',
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
            let result = JSON.parse(body); //微信服务器返回的body解析成result对象
            result.code = req.query.abc; //这个code是小程序的code
            let openid = result.openid;
        db.getuid(openid).then((res1)=>{
        result.token = token.generateToken(res1);
            console.log('final result = ',result);
        console.log('veryfyToken = ',token.verifyToken(result.token));
        res.json(result); //给客户端返回的信息
        });
         })

})


app.post('/abc', function (req, res) {
          var user_name=req.body.username;
          console.log(user_name)
          res.send('Got a POST request: username='+user_name)
})

//helloworld                    
app.get('/', (req, res) => {
          res.send('Hello World Express!')
})

//数据库接口
//errand接口校内
app.get('/wxdb',function(req,res){
    db.getErrands(req,res).then((res1)=>{
        res.json(res1);
    })
});

app.get('/wxdb2',function(req,res){
    db.getErrandsout(req,res).then((res1)=>{
        res.json(res1);
    })
});

//二手商城接口
app.get('/shop',function(req,res){
   db.getShop(req,res).then((res1)=>{
        res.json(res1);
    })
});

//失物招领接口
app.get('/lost',function(req,res){
    db.getLost(req,res).then((res1)=>{
        res.json(res1);
    })
});

//confession接口
app.get('/confession',function(req,res){
    db.getConfession(req,res).then((res1)=>{
        res.json(res1);
    })
});


//插入新confession
app.get('/insertConfession',function(req,res){
    db.insertConfession(req,res).then((res1)=>{
        res.json(res1);
    })
});

//组队接口
app.get('/team',function(req,res){
    db.getTeam(req,res).then((res1)=>{
        res.json(res1);
    })
});


//插入新group
app.get('/insertTeam',function(req,res){
    db.insertTeam(req,res).then((res1)=>{
        res.json(res1);
    })
});

//job接口
app.get('/job',function(req,res){
    db.getJob(req,res).then((res1)=>{
        res.json(res1);
    })
});


//搜索用户资料
app.get('/profile',function (req,res) {
    db.getProfile(req,res).then((res1)=>{
        res.json(res1);
    })
 });

//修改用户的电话、邮件等
app.get('/insertProfile',function(req,res){
    db.insertProfile(req,res).then((res1)=>{
        res.json(res1);
    })
});