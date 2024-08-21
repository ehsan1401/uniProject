const mongoose = require("mongoose");
const ResumeSchema = new mongoose.Schema({
  usertokenref: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  PhoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  Birthday: {
    type: String,
    required: false,
  },
  skills :{
    type : [String],
    default : [],
    required : false,
  },
  Summary: {
    type: String,
    required: false,
  },
  tags: {
    type: [],
    required: true,
  },
  experience: {
    type : [],
    default : [],
    required : false,
  },
  education: {
    type : Object,
    default : {},
    required : false,
  },
  certifications: {
    type : [String],
    default : [],
    required : false,
  },
});

ResumeSchema.index({ tags: 'text' });

const ResumeModel = mongoose.model("Resume", ResumeSchema);
module.exports = ResumeModel;
