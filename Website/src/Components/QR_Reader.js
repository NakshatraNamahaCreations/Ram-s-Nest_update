import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { apiURL } from "./Common_URL";
// import { Html5QrcodeScanner } from 'html5-qrcode';
function QR_Reader() {
  const [scanResult, setScanResult] = useState(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  function handleManualSerialNumberChange(event) {
    setManualSerialNumber(event.target.value);
  }

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
            selectedTable: scanResult,
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
    <div className="App">
      <div className="mt-4">
        <img src="/img/logo.png" alt="logo" width="117px" />
      </div>
      <h1 className="mt-3">Scanning The Table</h1>
      <div>
        {/* <button
          onClick={() => window.location.reload()}
          class="btn btn-primary mt-4"
          type="submit"
        >
          <i class="fa-solid fa-rotate-right"></i>
        </button> */}
      </div>
      {scanResult ? (
        <div>
          <p className="mt-2"> Table Details: {scanResult}</p>

          {/* <button
            onClick={() => setShowModal(true)}
            class="btn btn-primary mt-4"
          >
            Book Table
          </button> */}

          <div className="mb-3" style={{ padding: "10px" }}>
            <h6 className="Guest-Details-head"> Enter Guest Details</h6>
            <div className="mt-2">
              {/* <label htmlFor="guests">Select Guest/s</label> */}
              {/* <br /> */}
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
                <div className="ms-2" onClick={() => window.location.reload()}>
                  <i class="fa-solid fa-rotate-right"></i>
                </div>
              </div>
            </div>
          </div>

          {/* <p>Serial Number: {scanResult.slice(-16)}</p> */}
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          {/* <p className="center-text">Or enter the serial number manually:</p> */}
          {/* <div className="center-input">
            <input
              type="text"
              value={manualSerialNumber}
              onChange={handleManualSerialNumberChange}
            />
            {manualSerialNumber && (
              <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
            )}
          </div> */}
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h6 className="Guest-Details-head"> Enter Guest Details</h6>
            <div className="mt-2">
              {/* <label htmlFor="guests">Select Guest/s</label> */}
              {/* <br /> */}
              <small style={{ color: "#535353" }}>Number of guests</small>
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
              <button onClick={submit} class="btn btn-primary mt-4">
                Book Table
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default QR_Reader;
