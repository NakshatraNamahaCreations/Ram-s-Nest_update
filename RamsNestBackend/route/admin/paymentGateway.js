const express = require("express");
const router = express.Router();
const paymentgetwaycontroller = require("../../controller/admin/paymentGateway");

router.post("/addpayment", paymentgetwaycontroller.initiatePayment);

// router.post("/pay", paymentgetwaycontroller.pay);
router.post(
  "/status/:merchantId/:merchantTransactionId/:userId",
  paymentgetwaycontroller.checkTransactionStatus
);
router.get(
  "/paymentstatus/:userId",
  paymentgetwaycontroller.getpaymentstatusByUserId
);
router.get("/getpayments", paymentgetwaycontroller.getAllPayment);

module.exports = router;
