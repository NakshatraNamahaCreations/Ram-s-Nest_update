const promocodeModel = require("../../model/admin/promocode");

class promocode {
  async addpromocode(req, res) {
    let {
      promocode,
      validity,
      category,
      description,
      startingdate,
      discountpercentage,
    } = req.body;
    try {
      let newpromocode = new promocodeModel({
        promocode,
        validity,
        description,
        startingdate,
        discountpercentage,
        category,
      });
      let save = newpromocode.save();
      if (save) {
        return res.json({ success: "promocode added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getallpromocode(req, res) {
    let promocode = await promocodeModel.find({});
    if (promocode) {
      return res.json({ promocode: promocode });
    } else {
      return res.status(500).json({ error: "not able to find promocode" });
    }
  }

  async postdeletepromocode(req, res) {
    let id = req.params.id;
    const data = await promocodeModel.deleteOne({ _id: id });
    return res.json({ success: "successfully" });
  }
}

const promocodecontroller=new promocode();
module.exports=promocodecontroller;
