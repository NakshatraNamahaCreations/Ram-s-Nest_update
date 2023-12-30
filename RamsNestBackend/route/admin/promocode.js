const express = require("express");
const router = express.Router();

const promocodecontroller = require("../../controller/admin/promocode");

router.post("/addpromocode",promocodecontroller.addpromocode);
router.get("/getallpromocode",promocodecontroller.getallpromocode);
router.post("/deletepromocode/:id",promocodecontroller.postdeletepromocode);

module.exports=router;
