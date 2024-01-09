import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function Convertcustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");

  const location = useLocation();
  const { data } = location.state || {};
  console.log("data------suman", data);

  const submit = async () => {
    if (!name || !email || !phonenumber) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "/addroomscustomer",
          method: "POST",
          baseURL: "https://api.ramsnesthomestay.com/api",
          headers: { "Content-Type": "application/json" },
          data: {
            name: name,
            email: email,
            phonenumber: phonenumber,
            Enquirydetails: data,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          alert("added Successful");
          //   console.log("response=====", response.data);
          // navigate(`/enquiry/${arrivaldate}`);
          window.location.assign("/roomcustomer");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="row">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div
          style={{
            color: "black",
            fontSize: 18,
            textAlign: "center",
            marginTop: "25px",
            fontWeight: "bold",
          }}
        >
          Customer Details
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-md-4">
            <div className="rm-input-label">Enter Customer Name</div>
            <div className="">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col-md-4">
            <div className="rm-input-label">Enter Customer Email</div>
            <div className="">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col-md-4">
            <div className="rm-input-label">Enter Customer Mobile Number</div>
            <div className="">
              <input
                type="text"
                value={phonenumber}
                onChange={(e) => setphonenumber(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>
        </div>

        <div
          className="row justify-content-center"
          onClick={submit}
          style={{ marginTop: 50 }}
        >
          <div
            style={{
              backgroundColor: "orange",
              padding: 6,
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              width: "150px",
              borderRadius: 5,
            }}
          >
            Add Customer
          </div>
        </div>
      </div>
    </div>
  );
}

export default Convertcustomer;
