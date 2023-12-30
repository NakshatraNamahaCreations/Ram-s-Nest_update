const mongoose = require("mongoose");

const promocodeSchema = new mongoose.Schema({
  promocode: {
    type: String,
  },
  validity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  startingdate: {
    type: String,
    required: true,
  },
  discountpercentage: {
    type: Number,
    required: true,
  },
},{timestamps:true});

const promocodeModel=mongoose.model("promocode",promocodeSchema);
module.exports=promocodeModel;
