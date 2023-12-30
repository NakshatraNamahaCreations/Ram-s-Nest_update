const mongoose=require("mongoose");

const cards=new mongoose.Schema({
    name:{
        type:String
    },
    cardnumber:{
        type:String
    },
    cvv:{
        type:String
    },
    expiredate:{
        type:String
    }
});

const cardsmodel=mongoose.model("cards",cards);
module.exports=cardsmodel;