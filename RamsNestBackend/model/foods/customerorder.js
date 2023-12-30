const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: ObjectId,
      required: true,
    },
    customerorderdatetime: {
      type: String,
    },
    food: {
      type: Array,
    },
    roomname: {
      type: String,
    },
    roomnumber: {
      type: String,
    },
    foodid: {
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
    status:{
      type:String,
      default:"inprocess",
      enum:[
          "inprocess",
          "assigned",
          "delivered",
          "cancelled"
      ]
  }

  },
  { timestamps: true }
);

const foodordermodel = mongoose.model("foodorder", orderSchema);
module.exports = foodordermodel;
