const express=require("express");
const router=express.Router();
const roomordercontroller=require("../../controller/rooms/roomorders");

router.post("/addroomorder",roomordercontroller.postroomorder);

router.get("/getroomorder/:id",roomordercontroller.getorder);
router.get("/getallroomorders",roomordercontroller.getallcustomerorder);
router.post("/roomrdercancel/:id",roomordercontroller.postcancelorder);

module.exports=router;

