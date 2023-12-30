const mongoose=require("mongoose");

const notificationSchema=new mongoose.Schema({

    content:{
        type:String
    },
    image:{
        type:String
    }
});

const notificationmodel= mongoose.model("notification",notificationSchema);
module.exports=notificationmodel;