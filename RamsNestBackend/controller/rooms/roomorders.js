const roomordermodel = require("../../model/rooms/roomorders");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types.ObjectId;

class customerorder {
  async postroomorder(req, res) {
    let {
      customerId,
      total,
      paymentmethod,
      customername,
      roomname,
      roomprice,
      orderdatetime,
      phonenumber,
      checkin,
      checkout,
      roomno,
      guest,
    } = req.body;

    try {
      let neworder = new roomordermodel({
        customerId: customerId,
        paymentmethod: paymentmethod,
        customername: customername,
        roomname: roomname,
        roomprice: roomprice,
        orderdatetime: orderdatetime,
        phonenumber: phonenumber,
        checkin: checkin,
        checkout: checkout,
        guest:guest,
        roomno:roomno,
        total: total,
        type: "customer",
      });
      neworder.save();

      return res.json({ success: "order create successfully" });
    } catch (error) {
      console.log(error);
    }
  }



  async getorder(req, res) {
    let id = req.params.id;
    const data = await roomordermodel
      .find({ customerId: id })
      .sort({ _id: -1 });
    return res.json({ roomorder: data });
  }

  async getallcustomerorder(req, res) {
    const data = await roomordermodel.find({}).sort({ _id: -1 });
    return res.json({ roomorder: data });
  }

  async postcancelorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await roomordermodel.findOneAndUpdate(
        { _id: orderid },
        { status: "cancelled" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the order",
        });
      } else {
        return res.json({ success: "cancelled Successful" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const roomordercontroller = new customerorder();
module.exports = roomordercontroller;
