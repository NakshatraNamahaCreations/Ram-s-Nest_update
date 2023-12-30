const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const foodSchema = new mongoose.Schema({
  adminid: {
    type: ObjectId,
    ref: "admins",
  },
  category: {
    type: String,
  },

  subcategory: {
    type: String,
  },
  foodname: {
    type: String,
  },
  foodimage: {
    type: String,
  },
  fooddesc: {
    type: String,
  },
  foodprice: {
    type: Number,
  },
  foodvolume: {
    type: String,
  },
  foodvolumetype: {
    type: String,
  },
  customerofferprice: {
    type: String,
  },

  foodfeatures: {
    type: String,
  },
  searchText: {
    type: String,
  },
  type: {
    type: String,
  },
  dishType: {
    type: String,
  },
  categoryId: {
    type: String,
  },
});

const foodModel = mongoose.model("foods", foodSchema);
module.exports = foodModel;
