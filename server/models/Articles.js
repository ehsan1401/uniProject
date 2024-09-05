const mongoose = require("mongoose");
const ArticlesSchema = new mongoose.Schema({
  tokenRef: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  Link: {
    type: String,
    required: false,
  },
  Summary:{
    type: String,
    required: false,
  },
  Date:{
    type: Date,
    default: Date.now,
    required: false,
  }
});

const ArticlesModel = mongoose.model("Articles", ArticlesSchema);
module.exports = ArticlesModel;
