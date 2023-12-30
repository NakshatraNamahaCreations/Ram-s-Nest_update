const express=require("express");
const router=express.Router();
const roomcontroller=require("../../controller/admin/rooms");
const multer=require("multer");

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/rooms");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});

const upload=multer({storage:storage});

router.post("/addroom",upload.any(),roomcontroller.addrooms);
router.get("/getallrooms",roomcontroller.getallrooms);
router.post("/delete:id",roomcontroller.deleteroom);

module.exports=router;