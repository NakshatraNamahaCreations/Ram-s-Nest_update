const express=require("express");
const router=express.Router();
const customerorder=require("../../controller/foods/customerorder");

router.post("/customer/addorder",customerorder.postcusorder);
router.get("/getcustomerorder",customerorder.getcustomerorder);
router.get("/getorder/:id",customerorder.getorder);
router.get("/getallcustomerorders",customerorder.getallcustomerorder);
router.post("/foodordercancel/:id",customerorder.postcancelorder);
router.post("/updatestatus/:id",customerorder.orderdeliveried);
module.exports=router;

