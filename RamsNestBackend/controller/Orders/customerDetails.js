const customerOrderModel = require("../../model/Orders/customerDetails");
class food {
  //add
  async BookTable(req, res) {
    let { guestName, mobileNumber, noOfPerson, selectedTable, guestEmail } =
      req.body;
    try {
      let customer = new customerOrderModel({
        guestName,
        mobileNumber,
        noOfPerson,
        selectedTable,
        guestEmail,
      });
      const data = await customer.save();
      return res.status(200).json({ success: "Success", user: data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred while booking the table" });
    }
  }

  //get
  async getBookings(req, res) {
    let customer = await customerOrderModel.find({}).sort({ _id: -1 });
    if (customer) {
      return res.status(200).json({ customerDetails: customer });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getparticularCustomer(req, res) {
    try {
      const _id = req.params.id;
      let customer = await customerOrderModel.findById(_id);
      if (customer) {
        return res.status(200).json({ particulatUser: customer });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(404).json({ error: "No User Found!" });
    }
  }
  //update
  // async orderDish(req, res) {
  //   try {
  //     const { selectedDishes } = req.body;
  //     console.log("Received Payload:", req.body);

  //     if (!Array.isArray(selectedDishes.length === 0)) {
  //       return res.status(400).json({ message: "Invalid selectedDishes data" });
  //     }
  //     const order = new customerOrderModel({
  //       selectedDishes,
  //     });
  //     await order.save();
  //     res.status(200).json({ message: "Order created successfully", order });
  //   } catch (error) {
  //     console.error("Error creating order", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }

  // async updateSelectedDishes(req, res) {
  //   try {
  //     const _id = req.params.id;
  //     const { selectedDishes } = req.body;
  //     if (selectedDishes === undefined) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "selectedDishes is undefined" });
  //     }
  //     const user = await customerOrderModel.findById(_id);
  //     if (!user) {
  //       return { success: false, message: "User not found" };
  //     }

  //     const parsedSelectedDishes = JSON.parse(selectedDishes);
  //     user.selectedDishes.push(...parsedSelectedDishes);
  //     const saveDishes = await user.save();
  //     if (saveDishes) {
  //       return res
  //         .status(200)
  //         .json({ success: true, message: "Updated Successfully", saveDishes });
  //     }
  //   } catch (error) {
  //     console.error("Error updating selected dishes", error);
  //     return { success: false, message: "Internal server error" };
  //   }
  // }

  // async updateSelectedDishes(req, res) {
  //   try {
  //     const _id = req.params.id;
  //     const { selectedDishes } = req.body;

  //     // Check if selectedDishes is a string
  //     if (typeof selectedDishes !== "string") {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "Invalid selectedDishes format" });
  //     }

  //     let parsedSelectedDishes;

  //     try {
  //       // Attempt to parse selectedDishes as JSON
  //       parsedSelectedDishes = JSON.parse(selectedDishes);
  //     } catch (error) {
  //       // Handle JSON parsing error
  //       return res
  //         .status(400)
  //         .json({
  //           success: false,
  //           message: "Invalid JSON format in selectedDishes",
  //         });
  //     }

  //     // Validate that parsedSelectedDishes is an array
  //     if (!Array.isArray(parsedSelectedDishes)) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "Invalid selectedDishes format" });
  //     }

  //     const user = await customerOrderModel.findById(_id);
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "User not found" });
  //     }

  //     // Push each item from parsedSelectedDishes into the selectedDishes array
  //     user.selectedDishes.push(...parsedSelectedDishes);

  //     const saveDishes = await user.save();
  //     if (saveDishes) {
  //       return res
  //         .status(200)
  //         .json({ success: true, message: "Updated Successfully", saveDishes });
  //     }
  //   } catch (error) {
  //     console.error("Error updating selected dishes", error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Internal server error" });
  //   }
  // }

  // async updateSelectedDishes(req, res) {
  //   try {
  //     const _id = req.params.id;
  //     const { selectedDishes } = req.body;

  //     // Assuming selectedDishes is an array of objects

  //     const user = await customerOrderModel.findById(_id);
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "User not found" });
  //     }

  //     // Push each item from selectedDishes into the selectedDishes array
  //     user.selectedDishes.push(...selectedDishes);

  //     const saveDishes = await user.save();
  //     if (saveDishes) {
  //       return res
  //         .status(200)
  //         .json({ success: true, message: "Updated Successfully", saveDishes });
  //     }
  //   } catch (error) {
  //     console.error("Error updating selected dishes", error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Internal server error" });
  //   }
  // }

  // checking
  // async updateSelectedDishes(req, res) {
  //   try {
  //     const _id = req.params.id;
  //     const { selectedDishes } = req.body;
  //     const user = await customerOrderModel.findById(_id);
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "User not found" });
  //     }

  //     // Assuming selectedDishes is an array of objects
  //     user.selectedDishes.push(...selectedDishes);

  //     const saveDishes = await user.save();
  //     if (saveDishes) {
  //       return res
  //         .status(200)
  //         .json({ success: true, message: "Updated Successfully", saveDishes });
  //     }
  //   } catch (error) {
  //     console.error("Error updating selected dishes", error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Internal server error" });
  //   }
  // }

  // below corrret
  async orderDish(req, res) {
    try {
      const _id = req.params.id;
      const { selectedDishes, orderingTime } = req.body;
      const user = await customerOrderModel.findById(_id);
      if (!user) {
        return { success: false, message: "User not found" };
      }
      user.selectedDishes.push(...selectedDishes);
      user.orderingTime = orderingTime;
      const saveDishes = await user.save();
      if (saveDishes) {
        return res.status(200).json({
          success: true,
          message: "Updated Successfully",
          saveDishes,
        });
      }
    } catch (error) {
      console.error("Error updating selected dishes", error);
      return { success: false, message: "Internal server error" };
    }
  }
  async startCookingStatus(req, res) {
    const foodId = req.params.id;
    console.log("Received PUT request for food ID:", foodId);
    try {
      const { foodStatus } = req.body;
      const selectedFood = await customerOrderModel.findOne({
        _id: foodId,
      });
      console.log("selectedFood", selectedFood);
      if (!selectedFood) {
        return res.status(401).json({ error: "Selected Food not found" });
      }
      selectedFood.foodStatus = foodStatus;
      const updatedFood = await selectedFood.save();
      return res
        .status(200)
        .json({ success: "food status updated successfully", updatedFood });
    } catch (err) {
      console.log(err, "error");
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async readyToServe(req, res) {
    const foodId = req.params.id;
    console.log("Received PUT request for food ID:", foodId);
    try {
      const { foodStatus } = req.body;
      const selectedFood = await customerOrderModel.findOne({
        _id: foodId,
      });
      console.log("selectedFood", selectedFood);
      if (!selectedFood) {
        return res.status(401).json({ error: "Selected Food not found" });
      }
      selectedFood.foodStatus = foodStatus;
      const updatedFood = await selectedFood.save();
      return res
        .status(200)
        .json({ success: "food status updated successfully", updatedFood });
    } catch (err) {
      console.log(err, "error");
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deliveredStatus(req, res) {
    const foodId = req.params.id;
    console.log("Received PUT request for food ID:", foodId);
    try {
      const { foodStatus } = req.body;
      const selectedFood = await customerOrderModel.findOne({
        _id: foodId,
      });
      console.log("selectedFood", selectedFood);
      if (!selectedFood) {
        return res.status(401).json({ error: "Selected Food not found" });
      }
      selectedFood.foodStatus = foodStatus;
      const updatedFood = await selectedFood.save();
      return res
        .status(200)
        .json({ success: "food status updated successfully", updatedFood });
    } catch (err) {
      console.log(err, "error");
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
const customerOrderDetails = new food();
module.exports = customerOrderDetails;
