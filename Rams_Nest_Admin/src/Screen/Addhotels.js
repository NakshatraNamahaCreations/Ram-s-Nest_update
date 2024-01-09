import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import axios from "axios";

function Addfood() {
  const apiURL = "https://api.ramsnesthomestay.com/api";
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [roomname, setroomname] = useState("");
  const [roomdesc, setroomdesc] = useState("");
  const [roomprice, setroomprice] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [roomno, setroomno] = useState("");
  const [address, setaddress] = useState("");
  const [roomfeature, setroomfeature] = useState("");
  const formdata = new FormData();

  const addfood = async (e) => {
    e.preventDefault();
    if (!image1 || !image2 || !image3) {
      alert("Please select images");
    }
    if (!roomname || !roomdesc || !roomprice || !maxcount) {
      alert("please enter all fields");
    }
    formdata.append("roomimage", image1);
    formdata.append("roomimage", image2);
    formdata.append("roomimage", image3);
    formdata.append("roomname", roomname);
    formdata.append("roomdesc", roomdesc);
    formdata.append("roomprice", roomprice);
    formdata.append("maxcount", maxcount);
    formdata.append("roomno", roomno);
    formdata.append("address", address);
    formdata.append("roomfeature", roomfeature);
    try {
      const config = {
        url: "/addrooms",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully added");
          window.location.assign("/hotels");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row me-0">
        <Header />
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="magin">
            <Card
              className="text-center mt-5"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <h5 className="pt-5"> Add room</h5>
              <Card.Body>
                <div className="row me-0">
                  <div className="col-1"></div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>room icon</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage1(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>room image</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage2(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      <h5 style={{ marginRight: "100px" }}>room image</h5>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        style={{ border: "none" }}
                        onChange={(e) => setimage3(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                </div>
                <form autoComplete="off">
                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="room Name"
                        style={{ width: "275px" }}
                        onChange={(e) => setroomname(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Room Number"
                        style={{ width: "275px" }}
                        onChange={(e) => setroomno(e.target.value)}
                      />
                    </div>

                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="room Price"
                        style={{ width: "275px" }}
                        onChange={(e) => setroomprice(e.target.value)}
                      />
                    </div>

                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="address"
                        style={{ width: "275px" }}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Max count"
                        style={{ width: "275px" }}
                        onChange={(e) => setmaxcount(e.target.value)}
                      />
                    </div>
                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="room Description"
                        style={{ width: "275px" }}
                        onChange={(e) => setroomdesc(e.target.value)}
                      />
                    </div>

                    <div className="mt col-4">
                      <TextField
                        id="standard-secondary"
                        label="Room Features"
                        style={{ width: "275px" }}
                        onChange={(e) => setroomfeature(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row pt-3"></div>
                </form>
                <button
                  className="btn btn-outline-primary mt-4"
                  onClick={addfood}
                >
                  Add room
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addfood;
