const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  mobile: String,
  age: String,
  pass: String,
  sex:String,
});

// mongoose.model(modelName:集合名, schema);
const AdminModel = mongoose.model("admin", adminSchema);


function AdminRegister(req, res) {
  const { query } = req;
  AdminModel.find({ mobile: query.mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      const admins = new AdminModel(query);
      admins.save((err, adminCollection) => {
        if (err) {
          res.end(err);
          console.log("数据插入失败");
          return;
        }
        console.log("数据插入成功");
        res.end("恭喜您，管理员注册成功！");
      });
    } else {
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end("该管理员已注册!");
    }
  });
}

function AdminLogin(req, res) {
  const { query } = req;
  const {pass,mobile} = query
  AdminModel.find({ mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end("该手机号未注册!");
    } else {
      AdminModel.find({ mobile, pass }, (err, docs) => {
        if (err) {
          console.log("查询注册信息失败");
        }
        else if (docs.length === 0) {
          res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
          res.end("密码错误");
        }
        else {
          res.end("登陆成功");
        }

      })
    }
  });
}

module.exports = {
  AdminRegister,
  AdminLogin
};
