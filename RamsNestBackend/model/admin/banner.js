const mongoose=require("mongoose");

const bannerSchema=new mongoose.Schema({
type:{
    type:String,
},
banner:{
    type:String
},

},
{
    timestamps: true,
}
);

const bannerModel=mongoose.model("banner",bannerSchema);
module.exports=bannerModel;
