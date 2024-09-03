const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  act: {
    type: String,
    required: true,
  },
  imageAddress: {
    type: String,
    required: false,
  },
  ResumeCover: {
    type : String,
    required : false,
  },
  PhoneNumber: {
    type: String,
    required: false,
  },
  bookmarkId: {
    type: String,
    required: true,
  },
  bookmarks: {
    type: [String],
    required: false,
  },
  Birthday: {
    type: String,
    required: false,
  },
  degree: {
    type: String,
    required: false,
  },
  file: {
    type: String,
    required: false,
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
