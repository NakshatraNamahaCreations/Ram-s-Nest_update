import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Offcanvas } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Dish_Category, Veg_Starters, table_Allocation } from "./Json_data";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addDish,
  decreaseDishCount,
  increaseDishCount,
  removeDish,
} from "./actions";
import axios from "axios";
import moment from "moment";
import transitions from "@material-ui/core/styles/transitions";
// import { WebView } from "react-webview";

function Main_Dish() {
  const dispatch = useDispatch();
  const selectedDishes = useSelector((state) => state.dishes.selectedDishes);
  const hasSelectedDishes = Object.keys(selectedDishes).length > 0;
  const user = JSON.parse(sessionStorage.getItem("Customer Details"));
  // console.log("hasSelectedDishes", hasSelectedDishes);
  console.log("selectesdDishes", selectedDishes);

  const { name, id } = useParams();
  // console.log(name, id);
  const [searchMenu, setSearchMenu] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [countByDish, setCountByDish] = useState({});
  const [show, setShow] = useState(false);
  // console.log("time", time, date);
  const handleClose = () => setShow(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allFood, setAllFood] = useState([]);
  const [sendUserOrder, setSendUserOrder] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [Transaction, setTransaction] = useState("");
  const [customerOrders, setCustomerOrders] = useState([]);
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    getallfoods();
    // getAllOrderDetails();
  }, []);

  const getallfoods = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallfood"
    );
    if (res.status === 200) {
      // console.log("all dishes", res.data);
      setAllFood(res.data?.foods);
    }
  };

  // const getAllOrderDetails = async () => {
  //   let res = await axios.get(
  //     `https://api.ramsnesthomestay.com/api/orders/getparticularcustomerbookingdetails/${user._id}`
  //   );
  //   if (res.status === 200) {
  //     console.log("customerOrders", res.data);
  //     setCustomerOrders(res.data?.particulatUser);
  //   }
  // };

  // console.log("allFood", allFood);

  const filteringDishesType = allFood.filter(
    (items) => items.category === name && items.categoryId === id
  );
  // console.log("filteringDishesType", filteringDishesType);
  const dishType = filteringDishesType[0]?.dishType;

  useEffect(() => {
    const filterDishes = () => {
      const filteringDishesType = allFood.filter(
        (items) => items.category === name && items.categoryId === id
      );

      let results = filteringDishesType;
      if (searchMenu.length > 0) {
        results = results.filter((item) =>
          item.foodname.toLowerCase().includes(searchMenu.toLowerCase())
        );
      }
      setSearchResults(results);
    };

    // Check if allFood is available, then apply filtering
    if (allFood.length > 0) {
      filterDishes();
    }
  }, [allFood, name, id, searchMenu]);

  // const sendUserOrder = {};
  // const placeAnOrder = async () => {
  let userData = {
    guestName: guestName,
    mobileNumber: mobileNumber,
    noOfPerson: parseInt(guestCount),
    selectedTable: selectedTable,
    foods: countByDish,
    date: moment(date).format("DD-MM-YYYY"),
    time: time,
  };
  //   setSendUserOrder(userData);
  // };
  // const getorders = placeAnOrder;
  // console.log("getorders", userData);

  const AddCount = (dishId, dishName, price, image) => {
    dispatch(addDish(dishId, dishName, price, image));
    setCountByDish((prevCounts) => ({
      ...prevCounts,
      [dishId]: (prevCounts[dishId] || 0) + 1,
    }));
  };
  // console.log("countByDish", Object.keys(countByDish));
  const handleIncreaseCount = (dishId, dishName, price, image) => {
    dispatch(increaseDishCount(dishId, dishName, price, image));
    setCountByDish((prevCounts) => ({
      ...prevCounts,
      [dishId]: (prevCounts[dishId] || 0) + 1,
    }));
  };

  const handleDecreaseCount = (dishId, dishName, price, image) => {
    if (countByDish[dishId] > 1) {
      dispatch(decreaseDishCount(dishId, dishName, price, image));
      setCountByDish((prevCounts) => ({
        ...prevCounts,
        [dishId]: (prevCounts[dishId] || 0) - 1,
      }));
    } else {
      dispatch(removeDish(dishId));
      setCountByDish((prevCounts) => {
        const { [dishId]: _, ...restCounts } = prevCounts;
        return restCounts;
      });
    }
  };

  // useEffect(() => {
  //   // Update original counts whenever countByDish changes
  //   setSelecteddish(countByDish);
  // }, [countByDish]);

  // // Function to find objects with increasing counts
  // const findObjectsWithIncreasingCounts = () => {
  //   const increasingObjects = {};
  //   for (const dishId in countByDish) {
  //     if (countByDish[dishId] > (selecteddish[dishId] || 0)) {
  //       increasingObjects[dishId] = countByDish[dishId];
  //     }
  //   }
  //   console.log("Objects with increasing counts:", increasingObjects);
  // };

  // // Call this function whenever you want to find objects with increasing counts
  // findObjectsWithIncreasingCounts();

  // const handleDecreaseCount = (dishId, dishName, price) => {
  //   if (countByDish[dishId] > 1) {
  //     dispatch(decreaseDishCount(dishId, dishName, price));
  //   } else {
  //     dispatch(removeDish(dishId));
  //   }
  //   setCountByDish((prevCounts) => {
  //     const newCount = (prevCounts[dishId] || 0) - 1;
  //     return {
  //       ...prevCounts,
  //       [dishId]: newCount > 0 ? newCount : 0,
  //     };
  //   });
  // };

  const selectTable = (tableId) => {
    // Handle the selected table logic here
    // console.log(`Table ${tableId} selected`);
    setSelectedTable(tableId);
  };

  // console.log("selectedTable", selectedTable);
  // const handleIncreseCount = () => {
  //   setShowCountingBtn(false);
  //   setCount((prevCount) => prevCount + 1);
  // };

  // const handleDecreaseCount = () => {
  //   if (count > 1) {
  //     setCount((prevCount) => prevCount - 1);
  //   } else {
  //     setShowCountingBtn(true);
  //   }
  // };

  // let getSelectedObjects = countByDish;
  // console.log("countByDish", getSelectedObjects);
  let dishCount = Object.keys(countByDish);
  const ViewCart = () => {
    if (
      dishCount.length === 0
      // !guestName ||
      // !guestCount ||
      // !mobileNumber
      // !date ||
      // selectedTable === null
    ) {
      alert("Please provide all the details");
    }
    // else if (!time) {
    //   alert("Please select a time");
    // }
    else {
      setShow(true);
    }
  };

  const increaseSelectedDishCount = (dishId) => {
    dispatch(increaseDishCount(dishId));
  };

  const decreaseSelectedDishCount = (dishId) => {
    if (selectedDishes[dishId]?.count > 1) {
      dispatch(decreaseDishCount(dishId));
    } else {
      dispatch(removeDish(dishId));
    }
  };

  const removeSelectedDish = (dishId) => {
    dispatch(removeDish(dishId));
  };

  const findingTotal = () => {
    return Object.values(selectedDishes).reduce(
      (acc, curr) => acc + curr.price * curr.count,
      0
    );
  };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (
      Object.keys(selectedDishes).length === 0 ||
      Object.keys(selectedDishes).length < 0
    ) {
      setShow(false);
    } else {
      setTotalAmount(findingTotal());
    }
  }, [selectedDishes]);

  // console.log("selectedDishes", Object.keys(selectedDishes).length);
  // console.log("totalAmount", totalAmount.toFixed(2));

  return (
    <div className="container mt-2">
      <div className="row mt-4">
        {/* <div className="mb-3 p-2">
          <div
            style={{ fontSize: "13px", color: "darkslategray" }}
            onClick={() => window.location.assign("/home")}
            // class="btn btn-primary"
          >
            <i class="fa-solid fa-chevron-left"></i> Back
          </div>
        </div> */}
        {searchResults.length < 0 ||
        searchResults.length === 0 ||
        !searchResults ? (
          <>
            <div className="no-available">
              <img
                src="/No-dish-available.png"
                alt="none"
                style={{ width: "25%" }}
              />
              <p className="m-3">No Items</p>
            </div>
          </>
        ) : (
          <div className="col-md-8">
            <div className="row mb-4">
              <div className="col-md-6">
                <h4
                  className="select-menu-heading"
                  style={{ color: dishType === "Veg" ? "#198754" : "#dc3545" }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
                </h4>
              </div>
              <div className="col-md-6">
                <input
                  className="searc-input"
                  placeholder="Search..."
                  onChange={(e) => setSearchMenu(e.target.value)}
                />
              </div>
            </div>
            {searchResults.map((ele, index) => (
              <div key={index} className="p-2 category-card">
                <div className="main-dish-behaviour">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`https://api.ramsnesthomestay.com/food/${ele.foodimage}`}
                      alt=""
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50px",
                      }}
                    />
                    <h5 className="inner-title-main-dish"> {ele.foodname}</h5>
                  </div>
                  <div>
                    <h5 className="inner-title-main-dish">
                      {" "}
                      ₹ {ele.foodprice.toFixed(2)}{" "}
                    </h5>
                    {countByDish[ele._id] === undefined ||
                    countByDish[ele._id] === 0 ? (
                      <Button
                        variant={
                          dishType === "Veg"
                            ? "outline-success"
                            : "outline-danger"
                        }
                        size="sm"
                        onClick={() => {
                          AddCount(
                            ele._id,
                            ele.foodname,
                            ele.foodprice,
                            ele.foodimage
                          );
                        }}
                      >
                        Add +
                      </Button>
                    ) : (
                      <div>
                        <span>
                          <Button
                            variant={
                              dishType === "Veg"
                                ? "outline-success"
                                : "outline-danger"
                            }
                            size="sm"
                            onClick={() =>
                              handleDecreaseCount(
                                ele._id,
                                ele.foodname,
                                ele.foodprice,
                                ele.foodimage
                              )
                            }
                          >
                            -
                          </Button>
                        </span>
                        <span
                          className="m-2 inner-title-main-dish-cout"
                          style={{
                            color: dishType === "Veg" ? "#198754" : "#dc3545",
                          }}
                        >
                          {countByDish[ele._id]}
                        </span>
                        <span>
                          <Button
                            variant={
                              dishType === "Veg"
                                ? "outline-success"
                                : "outline-danger"
                            }
                            size="sm"
                            onClick={() => handleIncreaseCount(ele._id)}
                          >
                            +
                          </Button>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="col-md-4">
          <div className="order-sections">
            {/* <div className="calendar-container mb-3">
              <div className="calender-view">
                <h6 className="date-and-time">Select Date & Time</h6>
              </div>
              <Calendar onChange={setDate} value={date} minDate={today} />
               
              <div className="timing">
                <input
                  className="time-input"
                  type="time"
                  min="07:00"
                  max="23:00"
                  required
                  onChange={(e) => setTime(e.target.value)}
                />
                <small className="">Restaurant Opens at 7am to 11pm</small>
              </div>
            </div> */}
            {/* <div className="mb-3">
              <h6 className="Guest-Details-head"> Enter Guest Details</h6>
              <div className="mt-2">
                <label htmlFor="guests">Select Guest/s</label>
                <br />
                <small style={{ color: "#535353" }}>
                  Choose the number of guests going
                </small>
                <input
                  className="guest-inputs mt-2"
                  placeholder="0"
                  type="number"
                  min={1}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
                <br />
                <br />
                <input
                  className="guest-inputs"
                  placeholder="Enter Guest Name"
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <br />
                <br />
                <input
                  className="guest-inputs"
                  placeholder="Enter Mobile"
                  type="tel"
                  maxLength={10}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <br />
              </div>
            </div> */}
            {/* <div>
              <h6 className="Guest-Details-head mb-4"> Select Table</h6>
              <div className="mb-3">
                <div className="row ">
                  {table_Allocation.map((table, index) => (
                    <div key={index} className="col-md-3 mb-2">
                      <div
                        className="table-behaviour text-center"
                        style={{
                          backgroundColor:
                            selectedTable === table.tableNo ? "#006edc" : "",
                          color:
                            selectedTable === table.tableNo
                              ? "white"
                              : "#006edc",
                          borderColor: "#006edc",
                        }}
                        onClick={() => selectTable(table.tableNo)}
                      >
                        <div>{table.tableNo} </div>
                        <div>{table.noOfSeats} Seats</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div
        source={{ uri: paymentUrl }}
        onload={handleNavigationStateChange}
      /> */}

      {/* {Object.values(countByDish).some((count) => count > 0) && (
        <div className="view-cart-button">
          <Button onClick={ViewCart}>View Cart</Button>
        </div>
      )} */}
    </div>
  );
}

export default Main_Dish;
