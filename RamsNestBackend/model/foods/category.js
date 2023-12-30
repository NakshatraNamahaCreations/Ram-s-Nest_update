const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
    },
    categoryType: {
      type: String,
    },
    categoryimage: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
