const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const customerSchema = new mongoose.Schema({
  customerId: {
    type: ObjectId,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  profileimage: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender:{
  type:String
  },
  usertype: {
    type: String,
  },
  googleId:{
    type:String,
  },
  facebookid:{
   type:String,
  },
  status: {
    type: String,
    default: "offline",
    enum: ["offline", "online"],
  },
});
const customermodel = mongoose.model("customers", customerSchema);
module.exports = customermodel;
