import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

function Enquiry() {
  const [data, setdata] = useState([]);
  const { date } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getenquiry"
    );
    if (res.status === 200) {
      console.log(res);

      setdata(res.data?.enquiry.filter((i) => i.arrivaldate === date));
    }
  };

  console.log("data=======", data);

  const enquirydetail = (data) => {
    navigate(`/enquiryprint/${data}`);
  };

  return (
    <div className="row">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-3">
        <div style={{ marginTop: "25px" }}>
          <Table bordered hover size="">
            <thead>
              <tr>
                <th>S.No</th>
                <th>room</th>
                <th>arrivaldate</th>
                <th>departuredate</th>
                <th>noofguest</th>
                <th>stay</th>
                <th>ratecode</th>
                <th>adeposit</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>initial</th>
                <th>city</th>
                <th>state</th>
                <th>zipcode</th>
                <th>dlicense</th>
                <th>nkeys</th>
                <th>reserved</th>
                <th>comment</th>
                <th>ccnumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <th scope="row">{item.room}</th>
                  <td>{item.arrivaldate}</td>
                  <td>{item.departuredate}</td>
                  <td>{item.noofguest}</td>
                  <td>{item.stay}</td>
                  <td>{item.ratecode}</td>
                  <td>{item.adeposit}</td>
                  <td>{item.lastname}</td>
                  <td>{item.firstname}</td>
                  <td>{item.initial}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipcode}</td>
                  <td>{item.dlicense}</td>
                  <td>{item.nkeys}</td>
                  <td>{item.reserved}</td>
                  <td>{item.comment}</td>
                  <td>{item.ccnumber}</td>
                  <td>
                    <Link to="/convert" state={{ data: item }}>
                      <p
                        style={{
                          color: "skyblue",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Convert to Customer
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

export default Enquiry;
