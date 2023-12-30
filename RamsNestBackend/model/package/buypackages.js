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
    packageexpdatetime: {
        type: String,
      },
    packagename: {
      type: String,
    },
    packageid: {
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
    indoorgames:{
      type:String,
    },
    outdoorgames:{
      type:String,
    },
    swimmingpool:{
      type:String,
    },
    packagefeature:{
      type:String,
    },
    starttime:{
        type:String,
    },
    endtime:{
        type:String,
    },
    status:{
      type:String,
      default:"ongoing",
      enum:[
          "inprocess",
          "ongoing",
          "expiry",
          
      ]
  }

  },
  { timestamps: true }
);

const bypackagemodel = mongoose.model("buypackage", orderSchema);
module.exports = bypackagemodel;
