function dataBase() {
  const mongoose = require("mongoose");
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


module.exports = {
  dataBase
}