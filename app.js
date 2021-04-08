const express = require("express");
const app = express();
const port = 8000;
//连接数据库
const { dataBase } = require('./dataBase/getting-started')
dataBase()
//引入集合
const { DidRegister,DidLogin } = require('./dataBase/did-register')  //注册集合


app.all("*", function (req, res, next) {
  //设置允许跨域的域名
  res.header("Access-Control-Allow-Origin", "http://192.168.1.5:8081");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

app.post("/registered", (req, res) => {
  DidRegister(req,res)
});

app.post("/login", (req, res) => {
  DidLogin(req,res)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
