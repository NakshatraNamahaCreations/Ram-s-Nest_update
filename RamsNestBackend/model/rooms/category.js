const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryname: {
      type: String,
    },
    categoryimage: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("roomcategory", categorySchema);
module.exports = categoryModel;
