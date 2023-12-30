const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

//import routes
const customerauth = require("./route/customer/auth");
const banner = require("./route/admin/banner");
const slider = require("./route/admin/slider");
const category = require("./route/foods/category");
const subcategory = require("./route/foods/subcategory");
const food = require("./route/foods/food");
const packages = require("./route/package/packages");
const adminlogin = require("./route/admin/adminlogin");
const promocode = require("./route/admin/promocode");
const notification = require("./route/admin/notification");
const foodorder = require("./route/foods/customerorder");
const buypackage = require("./route/package/buypackages");
const rooms = require("./route/rooms/rooms");
const roomsorder = require("./route/rooms/roomorders");
const roomcategory = require("./route/rooms/category");
const paymentGetWay = require("./route/admin/paymentGateway");
const customerOrderBookings = require("./route/Orders/customerDetails"); //this 23-12-2023
// const orderBookings = require("./route/Orders/orderDetails"); //this 23-12-2023 no need
//routes
app.use("/api", customerauth);
app.use("/api", banner);
app.use("/api", slider);
app.use("/api", category);
app.use("/api", food);
app.use("/api", subcategory);
app.use("/api", packages);
app.use("/api", adminlogin);
app.use("/api", promocode);
app.use("/api", notification);
app.use("/api", foodorder);
app.use("/api", buypackage);
app.use("/api", rooms);
app.use("/api", roomsorder);
app.use("/api", roomcategory);
app.use("/api/payment", paymentGetWay);
app.use("/api/orders", customerOrderBookings);
// app.use("/api/orders", orderBookings);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
