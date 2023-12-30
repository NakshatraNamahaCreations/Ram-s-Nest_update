const express=require("express");
const router=express.Router();
const notificationcontroller=require("../../controller/admin/notification");

const multer=require("multer");

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/notification");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/postnotification",upload.single("image"),notificationcontroller.postnotification);
router.get("/getnotification",notificationcontroller.getnotification);
router.post("/postdeletenotification/:id",notificationcontroller.postdelete);

module.exports=router;