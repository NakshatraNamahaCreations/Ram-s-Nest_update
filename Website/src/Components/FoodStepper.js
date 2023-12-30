import React from "react";
import "./FoodStepper.css";

const FoodStepper = ({ foodStatus }) => {
  return (
    // <div>
    //   <div>
    //     <p>Received</p>
    //   </div>

    //   {foodStatus === "startCooking" && (
    //     <div>
    //       <p>Preparing </p>
    //     </div>
    //   )}

    //   {foodStatus === "readyToServe" && (
    //     <div>
    //       <p>Ready</p>
    //     </div>
    //   )}

    //   {foodStatus === "delivered" && (
    //     <div>
    //       <p>Delivered</p>
    //     </div>
    //   )}
    // </div>

    <div className="food-stepper">
      <div className="step">
        <div
          className="dot"
          style={{
            backgroundColor: "#ffbb46",
          }}
        ></div>
        <div
          className="line1"
          style={{
            backgroundColor:
              foodStatus === "startCooking" ||
              foodStatus === "readyToServe" ||
              foodStatus === "delivered"
                ? "#ffbb46"
                : "#cfcfcf",
          }}
        ></div>
        <p>Received</p>
      </div>

      <div className="step">
        <div
          className="dot"
          style={{
            backgroundColor:
              foodStatus === "startCooking" ||
              foodStatus === "readyToServe" ||
              foodStatus === "delivered"
                ? "#ffbb46"
                : "#cfcfcf",
          }}
        ></div>
        <div
          className="line2"
          style={{
            backgroundColor:
              foodStatus === "startCooking" ||
              foodStatus === "readyToServe" ||
              foodStatus === "delivered"
                ? "#ffbb46"
                : "#cfcfcf",
          }}
        ></div>
        <p>Preparing</p>
      </div>

      <div className="step">
        <div
          className="dot"
          style={{
            backgroundColor:
              foodStatus === "readyToServe" || foodStatus === "delivered"
                ? "#ffbb46"
                : "#cfcfcf",
          }}
        ></div>
        <div
          className="line3"
          style={{
            backgroundColor:
              foodStatus === "readyToServe" || foodStatus === "delivered"
                ? "#ffbb46"
                : "#cfcfcf",
          }}
        ></div>
        <p>Ready </p>{" "}
      </div>

      <div className="step ms-3">
        <div
          className="dot"
          style={{
            backgroundColor: foodStatus === "delivered" ? "#ffbb46" : "#cfcfcf",
          }}
        ></div>
        <p>Delivered</p>
      </div>
    </div>

    // <div className="food-stepper">
    //   <div className="step">
    //     <div
    //       className="dot"
    //       style={{
    //         backgroundColor: "#ffbb46",
    //       }}
    //     ></div>
    //     <div
    //       className="line"
    //       style={{
    //         backgroundColor:
    //           foodStatus === "startCooking" ||
    //           foodStatus === "readyToServe" ||
    //           foodStatus === "delivered"
    //             ? "#ffbb46"
    //             : "#cfcfcf",
    //       }}
    //     ></div>
    //     <p>Received</p>
    //   </div>

    //   <div className="step">
    //     <div
    //       className="dot"
    //       style={{
    //         backgroundColor:
    //           foodStatus === "startCooking" ||
    //           foodStatus === "readyToServe" ||
    //           foodStatus === "delivered"
    //             ? "#ffbb46"
    //             : "#cfcfcf",
    //       }}
    //     ></div>
    //     <div
    //       className="line"
    //       style={{
    //         backgroundColor:
    //           foodStatus === "startCooking" ||
    //           foodStatus === "readyToServe" ||
    //           foodStatus === "delivered"
    //             ? "#ffbb46"
    //             : "#cfcfcf",
    //       }}
    //     ></div>
    //     <p>Preparing</p>
    //   </div>

    //   <div className="step">
    //     <div
    //       className="dot"
    //       style={{
    //         backgroundColor:
    //           foodStatus === "startCooking" ||
    //           foodStatus === "readyToServe" ||
    //           foodStatus === "delivered"
    //             ? "#ffbb46"
    //             : "#cfcfcf",
    //       }}
    //     ></div>
    //     <div
    //       className="line"
    //       style={{
    //         backgroundColor:
    //           foodStatus === "startCooking" ||
    //           foodStatus === "readyToServe" ||
    //           foodStatus === "delivered"
    //             ? "#ffbb46"
    //             : "#cfcfcf",
    //       }}
    //     ></div>
    //     <p>Ready</p>
    //   </div>

    //   <div className="step">
    //     <div
    //       className="dot"
    //       style={{
    //         backgroundColor: foodStatus === "delivered" ? "#ffbb46" : "#cfcfcf",
    //       }}
    //     ></div>
    //     <p>Delivered</p>
    //   </div>
    // </div>
  );
};

export default FoodStepper;
