import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { MultiSelect } from "react-multi-select-component";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";
import Select from "react-select";
import { getValue } from "@mui/system";

function Addpackage() {
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [packageimage, setimage1] = useState("");
  const [packagename, setpackagename] = useState("");
  const [packageprice, setpackageprice] = useState("");
  const [indoorgames, setindoorgames] = useState();
  const [outdoorgames, setoutdoorgames] = useState();
  const [swimmingpool, setswimmingpool] = useState();
  const [packagefeature, setpackagefeature] = useState();
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [discount, setdiscount] = useState("");
  const formdata = new FormData();

  const ID = (e) => {
    setindoorgames(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const OD = (e) => {
    setoutdoorgames(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const PF = (e) => {
    setpackagefeature(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const SP = (e) => {
    setswimmingpool(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const addpackage = async (e) => {
    e.preventDefault();

    if (
      !packageimage ||
      !packagename ||
      !packageprice ||
      !packagefeature ||
      !indoorgames ||
      !outdoorgames ||
      !discount ||
      !starttime ||
      !endtime
    ) {
      alert("please enter all fields");
    }
    formdata.append("packageimage", packageimage);
    formdata.append("packagename", packagename);
    formdata.append("packageprice", packageprice);
    formdata.append("indoorgames", indoorgames);
    formdata.append("outdoorgames", outdoorgames);
    formdata.append("swimmingpool", swimmingpool);
    formdata.append("discount", discount);
    formdata.append("packagefeature", packagefeature);
    formdata.append("starttime", starttime);
    formdata.append("endtime", endtime);

    try {
      const config = {
        url: "/addpackage",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          console.log(response.data.packages);
          alert("Successfully added");
          window.location.assign("/package");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const IndoorGames = [
    { label: "Carom", value: "carom" },
    { label: "Chess", value: "chess" },
    { label: "Archery", value: "archery" },
  ];
  const OutdoorGames = [
    { label: "Cricket", value: "cricket" },
    { label: "Volley Ball", value: "volley ball" },
    { label: "Through Ball", value: "through ball" },
  ];

  const Includes = [
    {
      label: "Welcome drinks(Arrival Time)",
      value: "Welcome drinks(Arrival Time)",
    },
    {
      label: "Break fast(8:30 pm to 10:30 pm)",
      value: "Break fast(8:30 pm to 10:30 pm)",
    },
    {
      label: "Buffet lunch(1:00 pm to 2:45 pm)",
      value: "Buffet lunch(1:00 pm to 2:45 pm)",
    },
    {
      label: "Evening hi-tea snacks(4:30 pm to 5:30 pm)",
      value: "Evening hi-tea snacks(4:30 pm to 5:30 pm)",
    },
    {
      label: "Night dinner(8:00 pm to 9:30 pm)",
      value: "Night dinner(8:00 pm to 9:30 pm)",
    },
  ];

  const SwimmingPool = [
    { label: "Nylon & Synthentic", value: "Nylon & Synthentic" },
  ];

  const [disvalue, getdisvalue] = useState();

  return (
    <div>
      <div className="row me-0">
        <Header />
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="magin">
            <div></div>
            <h3 className="pt-5"> Add package</h3>
            <form autoComplete="off">
              <div className="row pt-3">
                <div className="mt col-4">
                  <label style={{ marginRight: "100px" }}>
                    <b> Select package Image *</b>
                  </label>
                  <input
                    type="file"
                    style={{ border: "none" }}
                    onChange={(e) => setimage1(e.target.files[0])}
                    required
                  />
                </div>
                <div className="mt col-4">
                  <TextField
                    id="standard-secondary"
                    label="package Name *"
                    style={{ width: "300px" }}
                    onChange={(e) => setpackagename(e.target.value)}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="mt col-4">
                  <TextField
                    id="standard-secondary"
                    label="package price *"
                    style={{ width: "300px" }}
                    onChange={(e) => setpackageprice(e.target.value)}
                  />
                </div>

                <div className="mt col-4">
                  <TextField
                    id="standard-secondary"
                    label="Customer Offer Price *"
                    style={{ width: "300px" }}
                    onChange={(e) => setdiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="mt col-4">
                  <TextField
                    id="standard-secondary"
                    label="Package Start Time *"
                    style={{ width: "300px" }}
                    type="time"
                    onChange={(e) => setstarttime(e.target.value)}
                  />
                </div>

                <div className="mt col-4">
                  <TextField
                    id="standard-secondary"
                    label="Package End Time *"
                    style={{ width: "300px" }}
                    type="time"
                    onChange={(e) => setendtime(e.target.value)}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="mt col-4">
                  <label>Indoor games</label>
                  <Select isMulti options={IndoorGames} onChange={ID}></Select>
                </div>
                <div className="mt col-4">
                  <label>Outdoor games</label>
                  <Select isMulti options={OutdoorGames} onChange={OD}></Select>
                </div>
              </div>
              <div className="row pt-3">
                <div className="mt col-4">
                  <label>Swimming Pool</label>
                  <Select isMulti options={SwimmingPool} onChange={SP}></Select>
                </div>
                <div className="mt col-4">
                  <label>Includes</label>
                  <Select isMulti options={Includes} onChange={PF}></Select>
                </div>
              </div>
            </form>

            <button
              className="btn btn-outline-primary mt-4"
              onClick={addpackage}
            >
              Add package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addpackage;
