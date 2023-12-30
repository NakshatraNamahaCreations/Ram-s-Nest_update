const mongoose = require("mongoose");

const CustomerDetails = new mongoose.Schema(
  {
    guestName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    guestEmail: {
      type: String,
    },
    noOfPerson: {
      type: Number,
    },
    selectedTable: {
      type: String,
    },
    foodStatus: {
      type: String,
    },
    orderingTime: {
      type: Date,
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

const customerOrderModel = mongoose.model("CustomerDetail", CustomerDetails);
module.exports = customerOrderModel;
