const port = 8000;
//基础代码封装
const { baseApp } = require("./base/getting-started");

//引入集合
const { UserRegister, UserLogin } = require("./model/users-register"); //用户注册集合
const { AdminRegister, AdminLogin } = require("./model/admins-register"); //管理员注册集合

//连接数据库，跨域、post请求体相关处理、数据流保存到文件系统代码封装
const { app, upload } = baseApp();

app.post("/music", upload.single("file"), (req, res) => {
  // upload.single("file") "file":要上传图片的key值，value: 图片数据;"file"字段必须和前端保持统一
  // {
  //   "file": 图片数据;
  // }
  console.log(req.file);
  const { mimetype, size,path } = req.file
  let types = ['mpeg']
  let tempType = mimetype.split("/")[1]  //获取mimetype的文件类型
  if (types.indexOf(tempType) === -1) {
    return res.send({statusCode:-1,msg:"媒体类型错误"})
  }
  else if (size>5000000) {
    return res.send({statusCode:-2,msg:"媒体体积过大"})
  }
  res.send({statusCode:200,msg:"上传成功",path})
});

//测试post请求体
app.post("/music", (req, res) => {
  console.log(req.body);
  res.send("hahaha");
});

//用户注册
app.post("/userRegistered", (req, res) => {
  UserRegister(req, res);
});

//用户登录
app.post("/userLogin", (req, res) => {
  UserLogin(req, res);
});

//管理员注册
app.post("/adminRegistered", (req, res) => {
  AdminRegister(req, res);
});

//管理员登录
app.post("/adminLogin", (req, res) => {
  AdminLogin(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
