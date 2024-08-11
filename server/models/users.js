const mongoose = require("mongoose");
const Birthday = require("./Birthday")

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
  PhoneNumber: {
    type: String,
    required: false,
  },
  bookmarkId: {
    type: String,
    required: true,
  },
  HouseAddress: {
    type: String,
    required: false,
  },
  Birthday: {
    type: Birthday.schema,
    required: false,
  },
  degree: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
