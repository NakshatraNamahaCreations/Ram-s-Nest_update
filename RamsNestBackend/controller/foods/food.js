const foodModel = require("../../model/foods/food");
class food {
  //add
  // async postfood(req, res) {
  //   let {
  //     category,
  //     // subcategory,
  //     foodname,
  //     foodprice,
  //     categoryId,
  //     dishType,
  //     // fooddesc,
  //     // customerofferprice,
  //     // foodvolume,
  //     // foodvolumetype,
  //     // foodfeatures,
  //   } = req.body;
  //   let file = req.file.filename;
  //   // let file1 = req.files[1].filename;
  //   // let file2 = req.files[2].filename;
  //   try {
  //     if (
  //       !category |
  //       // !subcategory |
  //       !foodname |
  //       !foodprice
  //       // !customerofferprice |
  //       // !foodvolume |
  //       // !foodvolumetype |
  //       // !foodfeatures |
  //       // !fooddesc
  //     ) {
  //       return res.status(401).json({ error: "All fields must be required" });
  //     } else {
  //       let newfood = new foodModel({
  //         category,
  //         // subcategory,
  //         foodname,
  //         foodprice,
  //         dishType,
  //         categoryId,
  //         // foodfeatures,
  //         // foodvolumetype,
  //         foodimage: file,
  //         // fooddesc,
  //       });
  //       let save = newfood.save();
  //       if (save) {
  //         return res.json({ success: "food created successfully" });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async postfood(req, res) {
    let { category, foodname, foodprice, categoryId, dishType } = req.body;
    let file = req.file.filename;
    try {
      if (!category || !foodname || !foodprice || !file) {
        return res.status(401).json({ error: "All fields must be required" });
      } else {
        let newfood = new foodModel({
          category,
          foodname,
          foodprice,
          dishType,
          categoryId,
          foodimage: file,
        });
        let save = newfood.save();
        if (save) {
          return res.json({ success: "food created successfully" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //get
  async getallfoods(req, res) {
    let food = await foodModel.find({}).sort({ _id: -1 });
    if (food) {
      return res.status(200).json({ foods: food });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getcustomerfood(req, res) {
    let subcategory = req.params.subcategory;
    let foods = await foodModel.find({ subcategory: subcategory });

    if (foods) {
      return res.json({ foods: foods });
    }
  }

  //delete
  async deletefood(req, res) {
    let id = req.params.id;
    const data = await foodModel.deleteOne({ _id: id });
    return res.json({ sucess: "Delete successfuly" });
  }

  //edit

  // if (category) findFood.category = category;
  // if (foodname) findFood.foodname = foodname;
  // if (foodprice) findFood.foodprice = foodprice;
  // if (dishType) findFood.dishType = dishType;
  // if (categoryId) findFood.categoryId = categoryId;

  // 28-12-2023
  async editfood(req, res) {
    try {
      let id = req.params.id;
      let { category, foodname, foodprice, categoryId, dishType } = req.body;
      let file = req.file ? req.file.filename : null;
      const findFood = await foodModel.findOne({ _id: id });
      if (!findFood) {
        return res.status(401).json({ error: "No Food Found" });
      }

      findFood.category = category || findFood.category;
      findFood.foodname = foodname || findFood.foodname;
      findFood.foodprice = foodprice || findFood.foodprice;
      findFood.dishType = dishType || findFood.dishType;
      findFood.categoryId = categoryId || findFood.categoryId;
      if (file) findFood.foodimage = file;
      let updatedData = await foodModel.findOneAndUpdate(
        { _id: id },
        findFood,
        { new: true }
      );
      console.log("updatedData", updatedData);
      if (updatedData) {
        return res
          .status(200)
          .json({ message: "Updated successfully", data: updatedData });
      } else {
        return res.status(500).json({ status: false, msg: "Failed to update" });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }
}

const foodcontroller = new food();
module.exports = foodcontroller;
