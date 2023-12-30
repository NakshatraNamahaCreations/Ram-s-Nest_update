const subcategoryModel = require("../../model/foods/subcategory");

class subcategory {
  async addsubcategory(req, res) {
    let { subcategoryname, categoryname } = req.body;
    let file = req.file.filename;

    let add = new subcategoryModel({
      subcategoryname: subcategoryname,
      categoryname: categoryname,
      subcategoryimage: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "subcategory name added successfully" });
    }
  }
  async getsubcategory(req, res) {
    let subcategory = await subcategoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postsubcategory(req, res) {
    let {categoryname} = req.body;
    let subcategory = await subcategoryModel
      .find({ categoryname })
      .sort({ _id: -1 });
    console.log(subcategory);
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }
  
  async deletesubcategory(req, res) {
    let id = req.params.id;
    let data = await subcategoryModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const subcategorycontroller = new subcategory();
module.exports = subcategorycontroller;
