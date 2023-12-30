const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const roomShema=new mongoose.Schema({
    adminid:{
        type:ObjectId,
        ref:'admins'
    },
    roomname:{
        type:String,
    },
    roomimage:{
        type:String,
    },
    roomdesc:{
        type:String,
    },
    roomprice:{
        type:String,
    },
    roomfeature:{
        type:String,
    }


});

const roommodel=mongoose.model("rooms",roomShema);
module.exports=roommodel;