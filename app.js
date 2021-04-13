const port = 8000;
const { baseApp } = require('./base/getting-started')

//引入集合
const { UserRegister, UserLogin } = require('./model/users-register')  //用户注册集合
const { AdminRegister,AdminLogin } = require('./model/admins-register')  //管理员注册集合

//连接数据库，跨域、post请求体相关处理、数据流保存到文件系统代码封装
const { app, upload } = baseApp()


app.post("/music", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (req.file !== undefined) {
    let { path } = req.file;
    res.send({ statusCode: 1, msg: "上传成功", data: { path } });
  } else   {
    res.send({ statusCode: 0, msg: "类型不支持" });
  }
});


//测试post请求体
app.post("/music", (req, res) => {
  console.log(req.body);
  res.send('hahaha')
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
