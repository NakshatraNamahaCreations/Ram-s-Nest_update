const express=require("express");
const router=express.Router();
const slidercontroller=require("../../controller/admin/slider");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/slider");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addslider",upload.single("slider"),slidercontroller.postaddslider);
router.get("/getallslider",slidercontroller.getslider);
router.post("/deleteslider/:id",slidercontroller.postdeleteslider);

module.exports=router;

