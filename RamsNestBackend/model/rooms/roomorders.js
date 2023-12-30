const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      required: true,
    },
    purchasedatetime: {
      type: String,
    },
    roomexpdatetime: {
      type: String,
    },
    roomname: {
      type: String,
    },
    roomprice:{
        type:String
    },
    roomno:{
        type:String
    },
    roomid: {
      type: String,
    },
    customername: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    paymentmethod: {
      type: String,
    },
    total: {
      type: String,
    },
    guest: {
      type: String,
    },
    checkin: {
      type: String,
    },
    checkout: {
      type: String,
    },
    orderdatetime:{
     type:String,
    },
    status: {
      type: String,
      default: "ongoing",
      enum: ["inprocess", "ongoing", "expiry"],
    },
  },
  { timestamps: true }
);

const roomordermodel = mongoose.model("roomorder", orderSchema);
module.exports = roomordermodel;
