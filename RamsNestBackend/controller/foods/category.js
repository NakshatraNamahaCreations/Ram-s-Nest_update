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
}

const categorycontroller = new category();
module.exports = categorycontroller;
