import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

function Roomscustomer() {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getroomscustomer"
    );
    if (res.status === 200) {
      console.log(res);
      setdata(res.data?.customer);
    }
  };
  console.log("data=======", data);

  return (
    <div className="row">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-3">
        <div style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          Rooms Customer
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table bordered hover size="">
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item.id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenumber}</td>
                  <td>
                    <Link to="/enquiryprint" state={{ data: item }}>
                      <p
                        style={{
                          color: "skyblue",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Roomscustomer;
