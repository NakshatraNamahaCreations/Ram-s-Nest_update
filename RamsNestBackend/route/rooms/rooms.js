const express=require("express");
const router =express.Router();
const roomcontroller=require("../../controller/rooms/rooms");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/rooms");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.post("/addrooms",upload.any(),roomcontroller.postroom);
router.get("/getallrooms",roomcontroller.getallrooms);
router.post("/deleteroom/:id",roomcontroller.deleterooms);



module.exports=router;

