const mongoose = require("mongoose");
const { Schema } = mongoose;
const registerSchema = new Schema({
  mobile: String,
  age: String,
  pass: String,
});

// mongoose.model(modelName:集合名, schema);
const RegisterModel = mongoose.model("register", registerSchema);


function DidRegister(req, res) {
  const { query } = req;
  RegisterModel.find({ mobile: query.mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      const register = new RegisterModel(query);
      register.save((err, register) => {
        if (err) {
          res.end(err);
          console.log("数据插入失败");
          return;
        }
        console.log("数据插入成功");
        res.end("恭喜您，用户注册成功！");
      });
    } else {
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end("该用户已注册!");
    }
  });
}

function DidLogin(req, res) {
  const { query } = req;
  const {pass,mobile} = query
  RegisterModel.find({ mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end("该手机号未注册!");
    } else {
      RegisterModel.find({ mobile, pass }, (err, docs) => {
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
  DidRegister,
  DidLogin
};
