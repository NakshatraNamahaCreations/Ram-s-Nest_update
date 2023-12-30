const bannerModel = require("../../model/admin/banner");

class banner {
  async postaddbanner(req, res) {
    let file = req.file.filename;

    try {
      if (!file) {
        return res.status(500).json({ error: "Please select images" });
      } else {
        let newbanner = new bannerModel({
          banner: file,
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

  async getbanner(req, res) {
    let banner = await bannerModel.find({});
    if (banner) {
      return res.status(200).json({ banner: banner });
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }

  async postdeletebanner(req, res) {
    let id = req.params.id;
    const data = await bannerModel.deleteOne({ _id: id });
    return res.json({ success: "Successfully" });
  }
  
}

const bannercontroller = new banner();
module.exports = bannercontroller;
