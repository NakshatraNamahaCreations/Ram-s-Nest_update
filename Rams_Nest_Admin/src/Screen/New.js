import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function New() {
  const [arrivaldate, setarrivaldate] = useState("");
  const [room, setroom] = useState("");
  const [departuredate, setdeparturedate] = useState("");
  const [noofguest, setnoofguest] = useState("");
  const [stay, setstay] = useState("");
  const [ratecode, setratecode] = useState("");
  const [adeposit, setadeposit] = useState("");
  const [lastname, setlastname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [initial, setinitial] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [dlicense, setdlicense] = useState("");
  const [nkeys, setnkeys] = useState("");
  const [reserved, setreserved] = useState("");
  const [comment, setcomment] = useState("");
  const [ccnumber, setccnumber] = useState("");
  const [expirationdate, setexpirationdate] = useState("");
  const [address, setaddress] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    if (
      !arrivaldate ||
      !room ||
      !departuredate ||
      !noofguest ||
      !firstname ||
      !firstname ||
      !city ||
      !state ||
      !address
    ) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "/addenquiry",
          method: "POST",
          baseURL: "https://api.ramsnesthomestay.com/api",
          headers: { "Content-Type": "application/json" },
          data: {
            arrivaldate: arrivaldate,
            room: room,
            departuredate: departuredate,
            noofguest: noofguest,
            stay: stay,
            ratecode: ratecode,
            adeposit: adeposit,
            lastname: lastname,
            firstname: firstname,
            initial: initial,
            city: city,
            state: state,
            zipcode: zipcode,
            dlicense: dlicense,
            nkeys: nkeys,
            reserved: reserved,
            comment: comment,
            ccnumber: ccnumber,
            address: address,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          alert("booking Successful");
          console.log("response=====", response.data.data);
          // navigate(`/enquiry/${arrivaldate}`);
          window.location.assign("/enquiry");
          // const queryString = new URLSearchParams({
          //   rowData: JSON.stringify(response.data.data),
          // }).toString();
          // const newTab = window.open(`/enquirydetails/?${queryString}`);
          // const queryString = new URLSearchParams({
          //   rowData: JSON.stringify(response.data.data),
          // }).toString();

          // history.push(`/customersearchdetails/?${queryString}`);
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
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="rm-input-label">Confirmation No.</div>
            <div className="rm-input-value1">1</div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Arrival Date</div>
            <div className="">
              <input
                type="date"
                value={arrivaldate}
                onChange={(e) => setarrivaldate(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4 colrow">
            <div className="rm-input-label">Room</div>
            <div className="">
              <input
                type="text"
                value={room}
                onChange={(e) => setroom(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Departure Date</div>
            <div className="">
              <input
                type="date"
                value={departuredate}
                onChange={(e) => setdeparturedate(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">No Of Guest</div>
            <div className="">
              <input
                type="number"
                value={noofguest}
                onChange={(e) => setnoofguest(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Stay</div>
            <div className="">
              <input
                type="text"
                value={stay}
                onChange={(e) => setstay(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Rate Code</div>
            <div className="">
              <input
                type="text"
                value={ratecode}
                onChange={(e) => setratecode(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Advance Deposit</div>
            <div className="">
              <input
                type="text"
                value={adeposit}
                onChange={(e) => setadeposit(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">First Name</div>
            <div className="">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Last Name</div>
            <div className="">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Initial</div>
            <div className="">
              <input
                type="text"
                value={initial}
                onChange={(e) => setinitial(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">address</div>
            <div className="">
              {/* <input type="date"  className="rm-input-value w-100" /> */}
              <textarea
                rows="4"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                cols="50"
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">City</div>
            <div className="">
              <input
                type="text"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">State</div>
            <div className="">
              <input
                type="text"
                value={state}
                onChange={(e) => setstate(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Zipcode</div>
            <div className="">
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setzipcode(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Driving License(optional)</div>
            <div className="">
              <input
                type="text"
                value={dlicense}
                onChange={(e) => setdlicense(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Number of Keys(optional)</div>
            <div className="">
              <input
                type="text"
                value={nkeys}
                onChange={(e) => setnkeys(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">
              Type of Accommodation Reserved(optional)
            </div>
            <div className="">
              <input
                type="text"
                value={reserved}
                onChange={(e) => setreserved(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Comments</div>
            <div className="">
              <input
                type="text"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="rm-input-label">Credit Card & Number</div>
            <div className="">
              <input
                type="text"
                value={ccnumber}
                onChange={(e) => setccnumber(e.target.value)}
                className="rm-input-value w-100"
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div
            onClick={submit}
            className="col-md-3"
            style={{
              backgroundColor: "orange",
              padding: 8,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              borderRadius: 5,
              marginTop: 50,
            }}
          >
            Add enquiry
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
