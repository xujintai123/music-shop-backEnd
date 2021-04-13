const mongoose = require("mongoose");
const express = require("express");
const multer=require("multer")
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
  app.use(express.static('public'))
  
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

function saveFile() {
  let storage = multer.diskStorage({
    //指定文件路径
    destination: function (request, file, callback) {
      //地址相对于app.post文件位置
      callback(null, "./public/music"); // 定义文件上传路径
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (request, file, callback) {
      const fileFormat = (file.originalname).split(".")  //比如把abc.jpg分割成["xxx",abc","jpg"]
      const name=Date.now()+parseInt(Math.random()*99999) //防止多人同一微秒上传文件引起命名重复
      callback(null,`${name}.${fileFormat[fileFormat.length-1]}`)
    },
  });
  
  let upload = multer({
    limits: {
      fileSize: 1024 * 1000 * 10, //限制文件大小10MB
      files: 100, //限制文件数量
    },
    storage: storage, // 仓库
    fileFilter: function (request, file, cb) {
        request.specialData = file;
        cb(null, true); //  上传
    },
  });
  return upload
}

function baseApp() {
  dataBase()
  const app = baseOpt()
  const upload=saveFile()
  return { app, upload }
}


module.exports = {
  baseApp
};
