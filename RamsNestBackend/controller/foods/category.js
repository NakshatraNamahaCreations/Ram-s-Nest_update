const categoryModel = require("../../model/foods/category");

class category {
  async addcategory(req, res) {
    let { categoryname, categoryType } = req.body;
    let file = req.file.filename;

    let add = new categoryModel({
      categoryname: categoryname,
      categoryType,
      categoryimage: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "category name added successfully" });
    }
  }

  async getcategory(req, res) {
    let category = await categoryModel.find({}).sort({ _id: -1 });
    if (category) {
      return res.json({ category: category });
    }
  }

  async getallcategory(req, res) {
    let category = await categoryModel.aggregate([
      {
        $lookup: {
          from: "subcategory",
          localField: "categoryname",
          foreignField: "categoryname",
          as: "subcategory",
        },
      },
    ]);
    if (category) {
      return res.json({ category: category });
    }
  }

  async postdeletecategory(req, res) {
    let id = req.params.id;

    const data = await categoryModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully" });
  }

  async editCategory(req, res) {
    try {
      let id = req.params.id;
      let { categoryname, categoryType } = req.body;
      console.log("Received data:", req.body);
      let file = req.file ? req.file.filename : null;
      const findCategory = await categoryModel.findOne({ _id: id });
      if (!findCategory) {
        return res.status(401).json({ error: "No Category Found" });
      }
      findCategory.categoryname = categoryname || findCategory.categoryname;
      findCategory.categoryType = categoryType || findCategory.categoryType;
      if (file) findCategory.categoryimage = file;
      let updatedData = await categoryModel.findOneAndUpdate(
        { _id: id },
        findCategory,
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

const categorycontroller = new category();
module.exports = categorycontroller;
