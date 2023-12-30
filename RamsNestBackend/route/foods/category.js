const express=require("express");
const router=express.Router();
const categorycontroller=require("../../controller/foods/category");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/category");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addcategory",upload.single("categoryimage"),categorycontroller.addcategory);
router.get("/getcategory",categorycontroller.getcategory);
router.get("/getallcategory",categorycontroller.getallcategory);
router.post("/deletecategory/:id",categorycontroller.postdeletecategory);

module.exports=router;

 