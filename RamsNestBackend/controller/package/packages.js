const packageModel = require("../../model/package/packages");

class packages {
  async postpackage(req, res) {
    let {
      packagename,
      packageprice,
      packagefeature,
      indoorgames,
      outdoorgames,
      swimmingpool,
      starttime,
      endtime,
      discount,
    } = req.body;
    let file = req.files[0].filename;

    try {
      if (
        (!packagename,
        !packageprice,
        !packagefeature,
        !indoorgames,
        !starttime,
        !endtime,
        !outdoorgames,
        !discount)
      ) {
        return res.status(401).json({ error: "All fields must be required" });
      } else {
        let newpackage = new packageModel({
          packagename,
          packagefeature,
          packageprice,
          packageimage: file,
          indoorgames,
          starttime,
          endtime,
          outdoorgames,
          swimmingpool,
          discount,
        });
        let save = newpackage.save();
        if (save) {
          return res.json({ success: "Package added successfully" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //getPackages
  async getallpackages(req, res) {
    let packages = await packageModel.find({}).sort({ _id: -1 });
    if (packages) {
      return res.status(200).json({ packages: packages });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //delete
  async deletepackage(req, res) {
    let id = req.params.id;
    const data = await packageModel.deleteOne({ _id: id });
    return res.json({ success: "Delete successfuly" });
  }

  async editpackage(req, res) {
    let id = req.params.id;
    let {
      packagename,
      packageprice,
      packagefeature,
      packageimage,
      indoorgames,
      discount,
    } = req.body;
    let data = await packageModel.findByIdAndUpdate(
      { _id: id },
      {
        packagename,
        packageprice,
        packagefeature,
        packageimage,
        indoorgames,
        discount,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
}

const packagecontroller = new packages();
module.exports = packagecontroller;
