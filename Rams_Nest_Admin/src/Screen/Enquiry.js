import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Enquiry() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getenquiry"
    );
    if ((res.status = 200)) {
      console.log(res);
      setdata(res.data?.enquiry);
    }
  };

  const currentDate = moment().format("dddd, MM/DD/YYYY");

  console.log(currentDate);

  const eventCounts = data.reduce((counts, item) => {
    const date = item.arrivaldate;
    counts[date] = (counts[date] || 0) + 1;
    return counts;
  }, {});

  const events = Object.keys(eventCounts).map((date) => ({
    title: `${eventCounts[date]} events`,
    start: new Date(date),
    end: new Date(date),
  }));

  console.log("data---------", data);

  const localizer = momentLocalizer(moment);

  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    const selectedDate = moment(event.start).format("YYYY-MM-DD");
    navigate(`/enquirydetails/${selectedDate}`);
  };

  return (
    <div className="row">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 mt-3">
        <Link to="/new" style={{ textDecoration: "none" }}>
          <div
            className="row justify-content-end"
            style={{ marginRight: "10px", marginBottom: "20px" }}
          >
            <div
              className="col-md-2"
              style={{
                backgroundColor: "orange",
                width: 100,
                height: 30,
                borderRadius: 5,
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontSize: 14,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Add New
              </p>
            </div>
          </div>
        </Link>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          //   style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default Enquiry;
