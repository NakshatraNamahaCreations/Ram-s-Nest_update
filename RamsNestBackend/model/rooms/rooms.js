const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
      required: true,
    },

    maxcount: {
      type: Number,
    },

    roomno: {
      type: Number,
    },
    roomprice: {
      type: Number,
      required: true,
    },
    imagesurl: [],
    currentbookings: [],

    type: {
      type: String,
    },
    roomdesc: {
      type: String,
      required: true,
    },
    roomimage: {
      type: Array,
    },
    roomfeature:{
        type:String,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
