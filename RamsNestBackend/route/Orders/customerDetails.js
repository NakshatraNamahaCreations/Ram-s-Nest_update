const express = require("express");
const router = express.Router();
const customerOrderDetails = require("../../controller/Orders/customerDetails");

router.post("/addbooking", customerOrderDetails.BookTable);
router.get("/getcustomerbooking", customerOrderDetails.getBookings);
router.get(
  "/getparticularcustomerbookingdetails/:id",
  customerOrderDetails.getparticularCustomer
);
router.put("/addcustomerordereddish/:id", customerOrderDetails.orderDish);
router.put("/startcooking/:id", customerOrderDetails.startCookingStatus);
router.put("/readytoserve/:id", customerOrderDetails.readyToServe);
router.put("/delivereddish/:id", customerOrderDetails.deliveredStatus);

module.exports = router;
