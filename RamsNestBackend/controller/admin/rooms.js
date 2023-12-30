const roommodel = require("../../model/admin/rooms");

class rooms {
  async addrooms(req, res) {
    let { roomname, roomimage, roomdesc, roomprice, roomfeature } = req.body;
    let file = req.files[0].filename;
    let file1 = req.files[1].filename;
    let file2 = req.file2[2].filename;

    try {
      if (!roomname | !roomimage | !roomdesc | !roomprice | !roomfeature) {
        return res.status(401).json({ error: "All fields must be required" });
      } else {
        let newroom = new roommodel({
          roomname,
          roomdesc,
          roomimage: [file, file1, file2],
          roomprice,
          roomfeature,
        });
        let save = newroom.save();
        if (save) {
          return res.json({ success: "room added" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getallrooms(req, res) {
    let rooms = await roommodel.find({}.sort({ _id: -1 }));
    if (rooms) {
      return res.status(200).json({ rooms: rooms });
    } else {
      return res.status(500).json({ error: "Somthing went wrong" });
    }
  }
  async deleteroom(req, res) {
    let id = req.params.id;
    const data = await roommodel.deleteOne({ _id: id });
    return res.json({ success: "Delete successfuly" });
  }
  async editroom(req, res) {
    let id = req.params.id;
    let { roomname, roomimage, roomdesc, roomprice, roomfeature } = req.body;
    let data = await roommodel.findByIdAndUpdate(
      { _id: id },
      { roomname, roomdesc, roomprice, roomfeature }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
}
const roomcontroller = new rooms();
module.exports = roomcontroller;
