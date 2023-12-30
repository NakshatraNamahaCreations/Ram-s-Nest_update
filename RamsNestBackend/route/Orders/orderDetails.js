const express = require("express");
const router = express.Router();
const orderDetails = require("../../controller/Orders/orderDetails");

router.post("/orderdish", orderDetails.createOrder);
router.get("/getbookingdetails", orderDetails.getBookingsDetails);

module.exports = router;
