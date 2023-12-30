const roomModel = require("../../model/rooms/rooms");

class room {
  //add
  async postroom(req, res) {
    let { roomname, roomdesc, roomprice, maxcount, roomno,roomfeature } = req.body;
    let file = req.files[0].filename;
    let file1 = req.files[1].filename;
    let file2 = req.files[2].filename;
    try {
      if (!roomname | !roomdesc | !roomprice | !maxcount ) {
        return res.status(401).json({ error: "All fields must be required" });
      } else {
        let newroom = new roomModel({
          roomname,
          roomdesc,
          roomprice,
          maxcount,
          roomno,
          roomfeature,
          roomimage: [file, file1, file2],
        });
        let save = newroom.save();
        if (save) {
          return res.json({ success: "room created successfully" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //get
  async getallrooms(req, res) {
    let rooms = await roomModel.find({}).sort({ _id: -1 });
    if (rooms) {
      return res.status(200).json({ rooms: rooms });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //delete
  async deleterooms(req, res) {
    let id = req.params.id;
    const data = await roomModel.deleteOne({ _id: id });
    return res.json({ sucess: "Delete successfuly" });
  }

 
}

const roomcontroller = new room();
module.exports = roomcontroller;
