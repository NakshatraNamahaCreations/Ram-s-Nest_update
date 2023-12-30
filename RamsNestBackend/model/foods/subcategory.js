const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
  },
  subcategoryname: {
    type: String,
  },
  subcategoryimage:{
    type:String
  },
},

);

const subcategoryModel=mongoose.model("subcategory",subcategorySchema);
module.exports=subcategoryModel;
