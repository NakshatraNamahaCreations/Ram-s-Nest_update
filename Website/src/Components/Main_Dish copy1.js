import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Dish_Category, Veg_Starters, table_Allocation } from "./Json_data";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Main_Dish() {
  const { name } = useParams();
  const [searchMenu, setSearchMenu] = useState("");
  const [countByDish, setCountByDish] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const today = new Date();
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [show, setShow] = useState(false);
  console.log("time", time, date);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteringDish = Dish_Category.filter((items) => items.name === name);
  const dishType = filteringDish[0]?.dishType;

  const AddCount = (dishId) => {
    setCountByDish((prevCounts) => ({
      ...prevCounts,
      [dishId]: (prevCounts[dishId] || 0) + 1,
    }));
  };
  const handleIncreaseCount = (dishId) => {
    setCountByDish((prevCounts) => ({
      ...prevCounts,
      [dishId]: (prevCounts[dishId] || 0) + 1,
    }));
  };

  const handleDecreaseCount = (dishId) => {
    setCountByDish((prevCounts) => {
      const newCount = (prevCounts[dishId] || 0) - 1;
      return {
        ...prevCounts,
        [dishId]: newCount > 0 ? newCount : 0,
      };
    });
  };

  const selectTable = (tableId) => {
    // Handle the selected table logic here
    console.log(`Table ${tableId} selected`);
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

  let d = Object.keys(countByDish);
  console.log("countByDish", d);

  const ViewCart = () => {
    if (
      d.length === 0 ||
      !guestName ||
      !guestCount ||
      !mobileNumber ||
      !date ||
      selectedTable === null
    ) {
      alert("Please provide all the details");
    } else if (!time) {
      alert("Please select a time");
    } else {
      handleShow();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-4">
            <div className="col-md-6">
              <h4
                className="select-menu-heading"
                style={{ color: dishType === "Veg" ? "#198754" : "#dc3545" }}
              >
                {name}{" "}
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
          {Veg_Starters.map((ele, index) => (
            <div key={index} className="p-3 category-card">
              <div className="main-dish-behaviour">
                <div>
                  <h5 className="inner-title-main-dish"> {ele.name}</h5>
                </div>
                <div>
                  <h5 className="inner-title-main-dish">
                    {" "}
                    ₹ {ele.price.toFixed(2)}{" "}
                  </h5>
                  {countByDish[ele.id] === undefined ||
                  countByDish[ele.id] === 0 ? (
                    <Button
                      variant={
                        dishType === "Veg"
                          ? "outline-success"
                          : "outline-danger"
                      }
                      size="sm"
                      onClick={() => {
                        AddCount(ele.id);
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
                          onClick={() => handleDecreaseCount(ele.id)}
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
                        {countByDish[ele.id]}
                      </span>
                      <span>
                        <Button
                          variant={
                            dishType === "Veg"
                              ? "outline-success"
                              : "outline-danger"
                          }
                          size="sm"
                          onClick={() => handleIncreaseCount(ele.id)}
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
        <div className="col-md-4">
          <div className="order-sections">
            <div className="calendar-container mb-3">
              <div className="calender-view">
                <h6 className="date-and-time">Select Date & Time</h6>
              </div>
              <Calendar onChange={setDate} value={date} minDate={today} />
              {/* <br /> */}
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
            </div>
            <div className="mb-3">
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
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <br />
              </div>
            </div>
            <div>
              <h6 className="Guest-Details-head mb-4"> Select Table</h6>
              <div className="mb-3">
                <div className="row ">
                  {table_Allocation.map((table, index) => (
                    <div key={index} className="col-md-3 mb-2">
                      <div
                        className="table-behaviour text-center"
                        style={{
                          backgroundColor:
                            selectedTable === table.id ? "#006edc" : "",
                          color:
                            selectedTable === table.id ? "white" : "#006edc",
                          borderColor: "#006edc",
                        }}
                        onClick={() => selectTable(table.id)}
                      >
                        <div>{table.tableNo} </div>
                        <div>{table.noOfSeats} Seats</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        // className="offcanva-overlof"
        show={show}
        placement="end"
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Reservation Summary</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: 0 }}>
          <div className="p-2">
            {Veg_Starters.map((ele, index) => (
              <>
                <div className="">
                  <div className="main-dish-behaviour">
                    <div>
                      <h5 className="inner-title-main-dish">
                        {" "}
                        Peri Peri Frice
                      </h5>
                    </div>
                    <div>
                      <h5 className="inner-title-main-dish"> ₹ 220.00</h5>

                      <div>
                        <span>
                          <Button
                            variant={
                              dishType === "Veg"
                                ? "outline-success"
                                : "outline-danger"
                            }
                            size="sm"
                            // onClick={() => handleDecreaseCount(ele.id)}
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
                          {/* {countByDish[ele.id]} */}1
                        </span>
                        <span>
                          <Button
                            variant={
                              dishType === "Veg"
                                ? "outline-success"
                                : "outline-danger"
                            }
                            size="sm"
                            // onClick={() => handleIncreaseCount(ele.id)}
                          >
                            +
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            ))}
          </div>
          <div>
            <div className="total-amount">
              <span>Total Amount:</span>{" "}
              <span
                style={{
                  color: "#fdb839",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                &#x20B9;879898
              </span>
              {
                // totalAmount()
              }
            </div>{" "}
          </div>
          <div className="place-order-section ">
            <h4 style={{ fontSize: "16px" }}>PLACE ORDER</h4>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {Object.values(countByDish).some((count) => count > 0) && (
        <div className="view-cart-button">
          <Button onClick={ViewCart}>View Cart</Button>
        </div>
      )}
    </div>
  );
}

export default Main_Dish;
