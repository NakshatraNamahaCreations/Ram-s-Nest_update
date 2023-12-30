const buypackagemodel = require("../../model/package/buypackages");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types.ObjectId;

class customerorder {
  async postpackage(req, res) {
    let {
      customerId,
      total,
      paymentmethod,
      customername,
      packagename,
      purchasedatetime,
      packageexpdatetime,
      phonenumber,
      starttime,
      endtime,
      indoorgames,
      outdoorgames,
      packagefeature,
      swimmingpool,
      packageimage
    } = req.body;
 
    try {
      let neworder = new buypackagemodel({
        customerId: customerId,
        purchasedatetime: purchasedatetime,
        packageexpdatetime: packageexpdatetime,
        packagename:packagename,
        total: total,
        starttime: starttime,
        endtime: endtime,
        indoorgames:indoorgames,
        outdoorgames:outdoorgames,
        packagefeature:packagefeature,
        swimmingpool:swimmingpool,
        paymentmethod: paymentmethod,
        customername: customername,
        phonenumber: phonenumber,
        packageimage:packageimage,
        type: "customer",
      });
      neworder.save();

      return res.json({ success: "order create successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async getcustomerorder(req, res) {
    const customerorder = await buypackagemodel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "foodId",
          foreignField: "_id",
          as: "foods",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customers",
        },
      },
    ]);
    if (customerorder) {
      return res.status(200).json({ foodorder: customerorder });
    } else {
      return res.status(500).json({ error: "something went wrong..." });
    }
  }

  async getorder(req, res) {
    let id = req.params.id;
    const data = await buypackagemodel
      .find({ customerId: id })
      .sort({ _id: -1 });
    return res.json({ buypackage: data });
  }

  async getallcustomerorder(req, res) {
    const data = await buypackagemodel.find({}).sort({ _id: -1 });
    return res.json({ buypackage: data });
  }

  async postcancelorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await buypackagemodel.findOneAndUpdate(
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

const buypackagecontroller = new customerorder();
module.exports = buypackagecontroller;
