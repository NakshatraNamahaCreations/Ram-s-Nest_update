const express = require("express");
const router = express.Router();
const customerauthcontroller = require("../../controller/customer/auth");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/userimages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/customersignup", customerauthcontroller.postSignup);
router.post("/customersignin", customerauthcontroller.postSignin);
router.get("/allcustomer", customerauthcontroller.getallcustomer);
router.post(
  "/addimage/:id",
  upload.single("profileimage"),
  customerauthcontroller.postupdaterofile
);
router.post(
  "/updateprofile/:id",
  customerauthcontroller.updatecustomer
);
router.post("/logout", customerauthcontroller.getsignout);
router.post("/facebooksignin", customerauthcontroller.postfacebook);
router.post("/google", customerauthcontroller.postgoogle);

module.exports = router;
