const express=require("express");
const router=express.Router();
const categorycontroller=require("../../controller/rooms/category");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/roomcategory");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addroomcategory",upload.single("categoryimage"),categorycontroller.addcategory);
router.get("/getroomcategory",categorycontroller.getcategory);
router.get("/getallroomcategory",categorycontroller.getallcategory);
router.post("/deleteroomcategory/:id",categorycontroller.postdeletecategory);

module.exports=router;

 