const express=require("express");
const router=express.Router();
const packagecontroller=require("../../controller/package/packages");
const multer =require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/package");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload=multer({storage:storage});

router.post("/addpackage",upload.any(),packagecontroller.postpackage);
router.get("/getallpackages",packagecontroller.getallpackages);
router.post("/editpackage/:id",upload.any(),packagecontroller.editpackage);
router.post("/deletepackage/:id",packagecontroller.deletepackage);

module.exports=router;