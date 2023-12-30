const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const packageSchema = new mongoose.Schema({
  adminid: {
    type: ObjectId,
    ref: "admins",
  },
  packagename: {
    type: String,
  },
  packageimage: {
    type: String,
  },
  packageprice: {
    type: String,
  },
  packagefeature: {
    type: String,
  },
  indoorgames: {
    type: String,
  },
  outdoorgames: {
    type: String,
  },
  swimmingpool: {
    type: String,
  },
  discount: {
    type: String,
  },
  starttime: {
    type: String,
  },
  endtime: {
    type: String,
  },
});
const packagemodel = mongoose.model("packages", packageSchema);
module.exports = packagemodel;
