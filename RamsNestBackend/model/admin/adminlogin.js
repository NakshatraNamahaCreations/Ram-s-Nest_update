const mongoose = require("mongoose");

const adminloginschema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },
 
});

const adminloginmodel = mongoose.model("admin", adminloginschema);
module.exports = adminloginmodel;
