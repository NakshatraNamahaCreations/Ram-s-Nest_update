const sliderModel = require("../../model/admin/slider");

class slider {
  async postaddslider(req, res) {
    let file = req.file.filename;

    try {
      if (!file) {
        return res.status(500).json({ error: "Please select images" });
      } else {
        let newbanner = new sliderModel({
          slider: file,
        });
        let save = newbanner.save();
        if (save) {
          return res.json({ success: "image saved" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getslider(req, res) {
    let slider = await sliderModel.find({});
    if (slider) {
      return res.status(200).json({ slider: slider });
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }

  async postdeleteslider(req, res) {
    let id = req.params.id;
    const data = await sliderModel.deleteOne({ _id: id });
    return res.json({ success: "Successfully" });
  }
  
}

const slidercontroller = new slider();
module.exports = slidercontroller;
