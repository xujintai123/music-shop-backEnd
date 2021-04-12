const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  mobile: String,
  age: String,
  pass: String,
  sex:String,
});

// mongoose.model(modelName:集合名, schema);
const UserModel = mongoose.model("user", userSchema);


function UserRegister(req, res) {
  const { body } = req;
  UserModel.find({ mobile: body.mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      UserModel.create(body,(err, docs) => {
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

function UserLogin(req, res) {
  const { body } = req;
  const {pass,mobile} = body
  UserModel.find({ mobile }, (err, docs) => {
    if (err) {
      console.log("查询注册信息失败");
    } else if (docs.length === 0) {
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end("该手机号未注册!");
    } else {
      UserModel.find({ mobile, pass }, (err, docs) => {
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
  UserRegister,
  UserLogin
};
