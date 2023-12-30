const mongoose = require("mongoose");

const orderDetails = new mongoose.Schema(
  {
    guestName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    noOfPerson: {
      type: Number,
    },
    selectedTable: {
      type: String,
    },
    selectedDishes: [
      {
        name: String,
        price: Number,
        count: Number,
        // Add other properties as needed
      },
    ],
  },
  { timestamps: true }
);

const orderOrderModel = mongoose.model("orderdetails", orderDetails);
module.exports = orderOrderModel;
