const orderdetails = require("../../model/Orders/orderDetails");
class food {
  //add
  // async createOrder(req, res) {
  //   try {
  //     const {
  //       guestName,
  //       mobileNumber,
  //       noOfPerson,
  //       selectedTable,
  //       selectedDishes,
  //     } = req.body;

  //     // Validate the incoming data if needed

  //     // Create a new order
  //     const order = new orderdetails({
  //       guestName,
  //       mobileNumber,
  //       noOfPerson,
  //       selectedTable,
  //       selectedDishes,
  //     });

  //     // Save the order to the database
  //     await order.save();

  //     res.status(201).json({ message: "Order created successfully", order });
  //   } catch (error) {
  //     console.error("Error creating order", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  async createOrder(req, res) {
    try {
      const { customerDetails, selectedDishes } = req.body;
      console.log("Received Payload:", req.body);

      if (!Array.isArray(selectedDishes) || selectedDishes.length === 0) {
        return res.status(400).json({ message: "Invalid selectedDishes data" });
      }
      const order = new orderdetails({
        ...customerDetails,
        selectedDishes,
      });
      await order.save();
      res.status(200).json({ message: "Order created successfully", order });
    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Validate the incoming data if needed
  // if (
  //   typeof selectedDishes !== "object" ||
  //   Object.keys(selectedDishes).length === 0
  // ) {
  //   return res.status(400).json({ message: "Invalid selectedDishes data" });
  // }

  //get
  async getBookingsDetails(req, res) {
    let customer = await orderdetails.find({}).sort({ _id: -1 });
    if (customer) {
      return res.status(200).json({ customerDetails: customer });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

const oderDetails = new food();
module.exports = oderDetails;
