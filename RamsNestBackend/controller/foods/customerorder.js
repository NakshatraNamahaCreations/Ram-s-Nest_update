const foodordermodel = require("../../model/foods/customerorder");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types.ObjectId;

class customerorder {
  async postcusorder(req, res) {
    let {
      customerId,
      food,
      total,
      paymentmethod,
      customername,
      orderdatetime,
      phonenumber,
    } = req.body;

    try {
      let neworder = new foodordermodel({
        customerId: customerId,
        food: food,
        customerorderdatetime: orderdatetime,
        total: total,
        paymentmethod: paymentmethod,
        customername: customername,
        phonenumber: phonenumber,
        type: "customer",
      });
      neworder.save();

      return res.json({ success: "order create successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async getcustomerorder(req, res) {
    const customerorder = await foodordermodel.aggregate([
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
    const data = await foodordermodel
      .find({ customerId: id })
      .sort({ _id: -1 });
    return res.json({ foodorder: data });
  }

  async getallcustomerorder(req, res) {
    const data = await foodordermodel.find({}).sort({ _id: -1 });
    return res.json({ foodorder: data });
  }

  async postcancelorder(req, res) {
    let orderid = req.params.id;
    try {
      const data = await foodordermodel.findOneAndUpdate(
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

  //change status
  async orderdeliveried(req, res) {
    let id = req.params.id;
    try {
      const data = await foodordermodel.findOneAndUpdate(
        { _id: id },
        { status: "delivered" }
      );
      if (data) {
        return res.json({ sucess: "Order deleverired" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const ordercontroller = new customerorder();
module.exports = ordercontroller;
