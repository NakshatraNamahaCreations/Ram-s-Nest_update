const express=require("express");
const router=express.Router();
const bannercontroller=require("../../controller/admin/banner");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/banner");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addbanner",upload.single("banner"),bannercontroller.postaddbanner);
router.get("/getallbanner",bannercontroller.getbanner);
router.post("/deletebanner/:id",bannercontroller.postdeletebanner);

module.exports=router;

