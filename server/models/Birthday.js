const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
  day: String,
  month: String,
  year: String,
});

module.exports = mongoose.model('Birthday', birthdaySchema);