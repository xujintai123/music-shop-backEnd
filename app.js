const express = require("express");
const app = express();
const port = 8000;
//连接数据库
const { dataBase } = require('./dataBase/getting-started')
dataBase()
//引入集合
const { UserRegister, UserLogin } = require('./dataBase/users-register')  //用户注册集合
const { AdminRegister,AdminLogin } = require('./dataBase/admins-register')  //管理员注册集合


app.all("*", function (req, res, next) {
  //设置允许跨域的域名
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

//用户注册
app.post("/userRegistered", (req, res) => {
  UserRegister(req,res)
});

//用户登录
app.post("/userLogin", (req, res) => {
  UserLogin(req,res)
});

//管理员注册
app.post("/adminRegistered", (req, res) => {
  AdminRegister(req,res)
});

//管理员登录
app.post("/adminLogin", (req, res) => {
 AdminLogin(req,res)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
