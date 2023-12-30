const express=require("express");
const router=express.Router();
const buypackagecontroller=require("../../controller/package/buypackages");

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

router.post("/buypackage",upload.any(),buypackagecontroller.postpackage);
router.get("/getcustomerorder",buypackagecontroller.getcustomerorder);
router.get("/getbuypackage/:id",buypackagecontroller.getorder);
router.get("/getallbuypackage",buypackagecontroller.getallcustomerorder);
router.post("/postcancelled/:id",buypackagecontroller.postcancelorder);

module.exports=router;

