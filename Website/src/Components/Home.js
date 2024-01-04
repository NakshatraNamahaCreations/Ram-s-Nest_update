import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
// import { categoryDish } from "./Json_data";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./Common_URL";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("Customer Details"));
  const navigate = useNavigate();
  const [searchMenu, setSearchMenu] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [categoryDish, setCategoryDish] = useState([]);
  //   const seachData = () => {
  //     if (searchMenu.length === 0) {
  //       //   setSearchResults([]);
  //       return;
  //     } else {
  //       let data = categoryDish.filter((item) =>
  //         item.name.toLowerCase().includes(searchMenu.toLowerCase())
  //       );
  //       setSearchResults(data);
  //     }
  //   };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    try {
      let res = await axios.get(apiURL.BASE_URL + "/getcategory");
      if (res.status === 200) {
        setCategoryDish(res.data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let results = categoryDish;
    if (searchMenu.length > 0) {
      results = results.filter((item) =>
        item.categoryname.toLowerCase().includes(searchMenu.toLowerCase())
      );
    }
    setSearchResults(results);
  }, [searchMenu, categoryDish]);

  // console.log("searchResults", searchResults);

  const viewMainDish = (item) => {
    navigate(`/orders/menu/${item.categoryname}/${item._id}`);
  };

  const [mobileNumber, setMobileNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {
    if (!mobileNumber || !guestName || !guestCount) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "/orders/addbooking",
          method: "POST",
          baseURL: "https://api.ramsnesthomestay.com/api",
          headers: { "Content-Type": "application/json" },
          data: {
            guestName: guestName,
            guestEmail: email,
            mobileNumber: mobileNumber,
            noOfPerson: parseInt(guestCount),
            selectedTable: 1,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          console.log("Booking Successful!", response);
          sessionStorage.setItem(
            "Customer Details",
            JSON.stringify(response.data.user)
          );
          window.location.assign("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6">
          <div class="m-2">
            <h4 className="mb-3">Welcome {user.guestName}! </h4>
            {/* <div>
              <div className="mt-2">
                <div
                  style={{
                    color: "#535353",
                    textAlign: "left",
                    fontSize: ".875em",
                  }}
                >
                  Number of guests
                </div>
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
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
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
                <div
                  className="d-flex"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "13px",
                  }}
                >
                  <div>
                    <button onClick={submit} class="btn btn-primary ">
                      Book Table
                    </button>
                  </div>
                  <div
                    className="ms-2"
                    onClick={() => window.location.reload()}
                  >
                    <i class="fa-solid fa-rotate-right"></i>
                  </div>
                </div>
              </div>
            </div> */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search by Menu"
                onChange={(e) => setSearchMenu(e.target.value)}
              />
              {/* <InputGroup.Text
                id="basic-addon2"
                style={{ cursor: "pointer" }}
                // onClick={seachData}
              >
                <i class="fa fa-search" aria-hidden="true"></i>
              </InputGroup.Text> */}
            </InputGroup>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex button-views">
            <div
              className="m-2 all-type-button all-category"
              style={{
                backgroundColor: showAll ? "#0d6efd" : "",
                color: showAll ? "white" : "#0d6efd",
              }}
              onClick={() => {
                setShowAll(true);
                setShowVeg(false);
                setShowNonVeg(false);
              }}
            >
              All
            </div>
            <div
              className="m-2 all-type-button veg-category"
              style={{
                backgroundColor: showVeg ? "#198754" : "",
                color: showVeg ? "white" : "#198754",
              }}
              onClick={() => {
                setShowAll(false);
                setShowVeg(true);
                setShowNonVeg(false);
              }}
            >
              Veg
            </div>
            <div
              className="m-2 all-type-button nonveg-category"
              style={{
                backgroundColor: showNonVeg ? "#dc3545" : "",
                color: showNonVeg ? "white" : "#dc3545",
              }}
              onClick={() => {
                setShowAll(false);
                setShowVeg(false);
                setShowNonVeg(true);
              }}
            >
              Non Veg
            </div>
          </div>
        </div>
      </div>
      <div className="m-2">
        <h4 className="select-menu-heading">Select Menu</h4>
        <div className="row me-0" style={{ marginBottom: "5.5rem" }}>
          {showAll && (
            <>
              {searchResults.map((items, index) => (
                <div
                  className="col-md-4"
                  key={index}
                  onClick={() => viewMainDish(items)}
                >
                  <div className="category-card">
                    <div className="card-inner-behaviour">
                      <div className="text-center">
                        <img
                          className="categoryaImagecss"
                          src={`https://api.ramsnesthomestay.com/category/${items.categoryimage}`}
                          alt="default_category"
                        />
                        <br />
                        <br />
                        <p className="inner-title">
                          {items.categoryname[0].toUpperCase() +
                            items.categoryname.slice(1)}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {showVeg && (
            <>
              {categoryDish
                .filter((veg) => veg.categoryType === "Veg")
                .map((items, index) => (
                  <div
                    className="col-md-4"
                    key={index}
                    onClick={() => viewMainDish(items)}
                  >
                    <div className="category-card">
                      <div className="card-inner-behaviour">
                        <div className="text-center">
                          <img
                            className="categoryaImagecss"
                            src={`https://api.ramsnesthomestay.com/category/${items.categoryimage}`}
                            alt="default_category"
                          />
                          <br />
                          <br />
                          <p className="inner-title">
                            {items.categoryname[0].toUpperCase() +
                              items.categoryname.slice(1)}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
          {showNonVeg && (
            <>
              {categoryDish
                .filter((NonVeg) => NonVeg.categoryType === "Non Veg")
                .map((items, index) => (
                  <div
                    className="col-md-4"
                    key={index}
                    onClick={() => viewMainDish(items)}
                  >
                    <div className="category-card">
                      <div className="card-inner-behaviour">
                        <div className="text-center">
                          <img
                            className="categoryaImagecss"
                            src={`https://api.ramsnesthomestay.com/category/${items.categoryimage}`}
                            alt="default_category"
                          />
                          <br />
                          <br />
                          <p className="inner-title">
                            {items.categoryname[0].toUpperCase() +
                              items.categoryname.slice(1)}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
