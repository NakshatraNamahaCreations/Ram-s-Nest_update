const mongoose=require("mongoose");

const sliderSchema=new mongoose.Schema({
type:{
    type:String,
},
slider:{
    type:String
},

},
{
    timestamps: true,
}
);

const sliderModel=mongoose.model("slider",sliderSchema);
module.exports=sliderModel;
