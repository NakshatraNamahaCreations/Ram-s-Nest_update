import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function Dashbord() {
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [food, setfood] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    getallfoods();
    getcustomer();
  }, []);

  const getallfoods = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallfood"
    );
    if (res.status === 200) {
      console.log("food response", res);
      setfood(res.data?.foods);
    }
  };
  const getcustomer = async () => {
    try {
      const response = await axios.get(`${apiURL}/orders/getcustomerbooking`);

      if (response.status === 200) {
        console.log("all orders", response.data);
        setdata(response.data.customerDetails);
      }
    } catch (error) {
      console.warn(error);
      alert("Can't able  to fetch ");
      // setdatacondition(true);
      return error;
    }
  };
  const filteredData = data.filter((entry) => entry.selectedDishes.length > 0);
  // console.log("filteredData", filteredData.length);

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1">
        <h2>Hello Admin</h2>
        <div className="row">
          <div className="col-md-3">
            <div class="card-dashboard">
              <div className="card-dash-body">
                <div class="media align-items-center">
                  <div class="media-body me-2">
                    <h2 class="text-white dash-font-w600">{food.length} </h2>
                    <span class="dash-font-icon">
                      <i class="fa-solid fa-plate-wheat"></i>
                    </span>
                  </div>
                  <span class="text-white">Total Menus</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="card-dashboard">
              <div className="card-dash-body">
                <div class="media align-items-center">
                  <div class="media-body me-2">
                    <h2 class="text-white dash-font-w600">
                      {filteredData.length}{" "}
                    </h2>
                    <span class="dash-font-icon">
                      <i class="fa-regular fa-note-sticky"></i>
                    </span>
                  </div>
                  <span class="text-white">Total Oders</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="card-dashboard">
              <div className="card-dash-body">
                <div class="media align-items-center">
                  <div class="media-body me-2">
                    <h2 class="text-white dash-font-w600">{data.length}</h2>
                    <span class="dash-font-icon">
                      <i class="fa-solid fa-user-group"></i>
                    </span>
                  </div>
                  <span class="text-white">Total Customers</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-3">
            <div class="card-dashboard">
              <div className="card-dash-body">
                <div class="media align-items-center">
                  <div class="media-body me-2">
                    <h2 class="text-white dash-font-w600">459</h2>
                    <span class="text-white">Total Menus</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
