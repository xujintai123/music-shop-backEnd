const mongoose = require("mongoose");
const { Schema } = mongoose;
const musicListSchema = new Schema({
  mname: String,
  murl: String,
  mprice: String,
  //类别表id
  mcid: String,
  //歌手表id
  mmid: String,
  mtime: String,
});

// mongoose.model(modelName:集合名, schema);
const MusicListModel = mongoose.model("musicList", musicListSchema);

function AddLists() {
  
}

function GetLists() {
  
}