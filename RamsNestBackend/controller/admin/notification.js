const notificationmodel = require("../../model/admin/notification");

class notification {
  async postnotification(req, res) {
    let { content } = req.body;
    let file = req.file.filename;

    try {
      let add = new notificationmodel({
        content: content,
        image: file,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "notification added" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getnotification(req,res){
    let notification=await notificationmodel.find({}).sort({_id:-1});
    if(notification){
        return res.json({notification:notification});
    }
  }
  async postdelete(req,res){
    let id=req.params.id;
    let data=await notificationmodel.deleteOne({ _id : id});
    return res.json({sucess:"Successfull deleted"});
  }
}

const notificationcontroller=new notification();
module.exports=notificationcontroller;
