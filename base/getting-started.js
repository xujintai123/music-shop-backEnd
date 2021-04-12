const mongoose = require("mongoose");
const express = require("express");
const app = express();

function dataBase() {
  mongoose.connect("mongodb://localhost/music", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("成功连接数据库");
  });
}

function baseOpt() {
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

  return app
}

function baseApp() {
  dataBase()
  const app = baseOpt()
  return app
}


module.exports = {
  baseApp
};