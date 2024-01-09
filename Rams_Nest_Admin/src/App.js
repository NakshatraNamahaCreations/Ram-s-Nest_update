import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screen/Login";
import Sidebar from "./Screen/layout/Sidebar";
import Header from "./Screen/layout/Header";
import Footer from "./Screen/layout/Footer";
import Layout from "./Screen/layout/Layout";
import Food from "./Screen/Food";
import Editfood from "./Screen/Editfood";
import Category from "./Screen/Category";
import Subcategory from "./Screen/Subcategory";
import Addfood from "./Screen/Addfood";
import Customerbanner from "./Screen/Customerbanner";
import Dashboard from "./Screen/Dashboard";
import Customerorder from "./Screen/Customerorder";
import Package from "./Screen/Package";
import Addpackage from "./Screen/Addpackage";
import Home from "./Screen/Home";
import Customers from "./Screen/Customers";
import Promocode from "./Screen/Promocode";
import Notification from "./Screen/Notification";
import Customerinvoice from "./Screen/Customerinvoice";
import Buypackages from "./Screen/Buypackages";
import Hotels from "./Screen/Hotels";
import Hotelbooking from "./Screen/Hotelbooking";
import Addhotels from "./Screen/Addhotels";
import Hotelcategory from "./Screen/Hotelcategory";
import OrderDetails from "./Screen/OrderDetails";
import CustomerOrderHistory from "./Screen/CustomerOrderHistory";
import CustomerOrderHistoryDetails from "./Screen/CustomerOrderHistoryDetails";
import PrintInvoice from "./Screen/PrintInvoice";
import Enquiry from "./Screen/Enquiry";
import Enquirydetails from "./Screen/Enquirydetails";
import New from "./Screen/New";
import Enwuiryprint from "./Screen/Enwuiryprint";
import Convertcustomer from "./Screen/Convertcustomer";
import Roomscustomer from "./Screen/Roomscustomer";

function App() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/customerorder" element={<Customerorder />}></Route>
          {/* <Route path="/customerinvoice" element={<Customerinvoice />}></Route> */}
          <Route path="/orderdetails/:id" element={<OrderDetails />}></Route>
        </Routes>
      </Router>

      {admin == null ? (
        <div>
          {" "}
          <Router>
            <Routes>
              {/* <Route path="/" element={<Login />}></Route> */}
              {/* <Route path="/customerorder" element={<Customerorder />}></Route> */}
              {/* <Route
                path="/customerinvoice"
                element={<Customerinvoice />}
              ></Route> */}
              {/* <Route
                path="/orderdetails/:id"
                element={<OrderDetails />}
              ></Route> */}
            </Routes>
          </Router>
          {/* <Router>
            <Routes>
              <Route path="/customerorder" element={<Customerorder />}></Route>
            </Routes>
          </Router>
          <Router>
            <Routes>
              <Route
                path="/customerinvoice"
                element={<Customerinvoice />}
              ></Route>
            </Routes>
          </Router>
          <Router>
            <Routes>
              <Route path="/orderdetails" element={<OrderDetails />}></Route>
            </Routes>
          </Router> */}
        </div>
      ) : (
        <Router>
          <Routes>
            {" "}
            <Route path="/home" element={<Home />}></Route>
            <Route path="/sidebar" element={<Sidebar />}></Route>
            <Route path="/header" element={<Header />}></Route>
            <Route path="/footer" element={<Footer />}></Route>
            <Route path="/layout" element={<Layout />}></Route>
            <Route path="/food" element={<Food />}></Route>
            <Route path="/editfood" element={<Editfood />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/subcategory" element={<Subcategory />}></Route>
            <Route path="/addfood" element={<Addfood />}></Route>
            <Route path="/customerbanner" element={<Customerbanner />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/enquiry" element={<Enquiry />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/enquiryprint" element={<Enwuiryprint />}></Route>
            <Route path="/convert" element={<Convertcustomer />}></Route>
            <Route path="/roomcustomer" element={<Roomscustomer />}></Route>
            <Route
              path="/enquirydetails/:date"
              element={<Enquirydetails />}
            ></Route>
            <Route
              path="/customer-order-history"
              element={<CustomerOrderHistory />}
            ></Route>
            <Route
              path="/customer-order-history-details/:id"
              element={<CustomerOrderHistoryDetails />}
            ></Route>
            <Route path="/print-invoice/:id" element={<PrintInvoice />}></Route>
            <Route
              path="/customerinvoice"
              element={<Customerinvoice />}
            ></Route>
            <Route path="/package" element={<Package />}></Route>
            <Route path="/addpackage" element={<Addpackage />}></Route>
            <Route path="/customer" element={<Customers />}></Route>
            <Route path="/promocode" element={<Promocode />}></Route>
            <Route path="/notification" element={<Notification />}></Route>
            <Route path="/buypackages" element={<Buypackages />}></Route>
            <Route path="/hotels" element={<Hotels />}></Route>
            <Route path="/hotelbooking" element={<Hotelbooking />}></Route>
            <Route path="/addhotels" element={<Addhotels />}></Route>
            <Route path="/roomcat" element={<Hotelcategory />}></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
