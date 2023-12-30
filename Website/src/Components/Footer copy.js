import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseDishCount,
  increaseDishCount,
  orderDishAction,
  removeDish,
} from "./actions";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function Footer() {
  const dispatch = useDispatch();
  const selectedDishes = useSelector((state) => state.dishes.selectedDishes);
  const hasSelectedDishes = Object.keys(selectedDishes).length > 0;
  console.log("selectedDishes in footer component", selectedDishes);
  const [show, setShow] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("Customer Details"));

  const [sendUserOrder, setSendUserOrder] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [Transaction, setTransaction] = useState("");
  const [showWebView, setShowWebView] = useState(false);

  // console.log("Customer Details", user);
  // get session storage?

  const increaseSelectedDishCount = (dishId) => {
    dispatch(increaseDishCount(dishId));
  };

  const decreaseSelectedDishCount = (dishId) => {
    if (selectedDishes[dishId]?.count > 1) {
      dispatch(decreaseDishCount(dishId));
    } else {
      dispatch(removeDish(dishId));
    }
  };

  const removeSelectedDish = (dishId) => {
    dispatch(removeDish(dishId));
  };

  const findingTotal = () => {
    return Object.values(selectedDishes).reduce(
      (acc, curr) => acc + curr.price * curr.count,
      0
    );
  };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (
      Object.keys(selectedDishes).length === 0 ||
      Object.keys(selectedDishes).length < 0
    ) {
      setShow(false);
    } else {
      setTotalAmount(findingTotal());
    }
  }, [selectedDishes]);

  const [showPhonePeIframe, setShowPhonePeIframe] = useState(false);

  const preceedPayment = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/payment/addpayment",
        method: "post",
        baseURL: "https://api.ramsnesthomestay.com/api",
        headers: { "content-type": "application/json" },
        data: {
          amount: totalAmount,
          // orderId: generateOrderId(),
        },
      };
      const res = await axios(config);
      console.log(res.status);

      if (res.status === 200) {
        console.log("res", res);
        const base64ResponseData = res.data.base64;
        const sha256ResponseData = res.data.sha256encode;
        const merchantId = res.data.merchantId;
        const merchantTransactionId = res.data.merchantTransactionId;
        const redirectUrl = res.data.redirectUrl;
        setTransaction(res.data.merchantTransactionId);
        // setShowWebView(true);
        setShowPhonePeIframe(true);
        initiatePayment(
          base64ResponseData,
          sha256ResponseData,
          merchantId,
          merchantTransactionId,
          redirectUrl
        );
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        alert(error.response.data.error);
        console.log(error.response.data.error);
      }
    }
  };

  const initiatePayment = async (
    base64Data,
    sha256Data,
    merchantId,
    merchantTransactionId,
    redirectUrl
  ) => {
    try {
      const data = JSON.stringify({
        request: base64Data,
      });

      const config = {
        method: "post",
        url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": sha256Data,
        },
        data: data,
      };

      const response = await axios.request(config);

      const { redirectInfo } = response.data.data.instrumentResponse;
      setPaymentUrl(redirectInfo.url);
      setShowWebView(true);
      setIsCheckingStatus(true);
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle the error accordingly
    }
  };

  const handleNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log("url", url);

    if (url.startsWith("ibv://")) {
      setShowWebView(false);
      window.location.assign("paymentsuceess");
      if (url.startsWith("ibv://paymentsuceess")) {
        window.location.assign("paymentsuceess");
      } else if (url.startsWith("ibv://paymentsuceess")) {
        window.location.assign("paymentsuceess");
      } else {
        alert("Unsupported URL scheme: " + url);
        setShowWebView(false);
      }
    } else {
      setRedirectUrl(url);
      window.location.assign("paymentsuceess");
    }
  };

  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  useEffect(() => {
    if (isCheckingStatus) {
      const intervalId = setInterval(() => {
        checkTransactionStatus();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [isCheckingStatus]);

  // const userId = "yg8f4387t48tg3984f34t";/
  const checkTransactionStatus = async () => {
    const merchantId = "M1KSO0OLXGKZ";
    try {
      const config = {
        url: `/payment/status/${merchantId}/${Transaction}/${user._id}`,
        method: "post",
        baseURL: "http://192.168.1.103:8000/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      const res = await axios(config);
      console.log(res.status);

      if (res.status === 200) {
        console.log("response", res.data);
        const responseData = res.data.responseData;
        const code = responseData.code;
        if (code === "PAYMENT_SUCCESS") {
          setIsCheckingStatus(false);
          setShowWebView(false);
          window.location.assign("paymentsuceess");
        } else {
          window.location.assign("/");
        }
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
    }
  };

  // const orderDish = () => {
  //   try {
  //     const payload = {
  //       guestName: user.name,
  //       mobileNumber: user.mobileNumber,
  //       noOfPerson: user.noOfPerson,
  //       selectedTable: user.selectedTable,
  //       selectedDishes: selectedDishes,
  //     };

  //     // Dispatch the action to send the data to the backend
  //     dispatch(orderDishAction(payload));
  //     const config = {
  //       url: "/payment/addpayment",
  //       method: "post",
  //       baseURL: "https://api.ramsnesthomestay.com/api",
  //       headers: { "content-type": "application/json" },
  //       data: payload

  //     }

  //     const res = await axios(config);
  //     console.log(res.status);

  //   }catch(error){
  //     if (error.response) {
  //       alert(error.response.data.error);
  //       console.log(error.response.data.error);
  //     }
  //   }
  //   }

  // const orderDish = async () => {
  //   console.log("going to ordering...............");
  //   try {
  //     const payload = {
  //       // customerDetails: {
  //       //   guestName: user.guestName,
  //       //   mobileNumber: user.mobileNumber,
  //       //   noOfPerson: user.noOfPerson,
  //       //   selectedTable: user.selectedTable,
  //       // },
  //       selectedDishes: Object.values(selectedDishes),
  //     };
  //     console.log("food ordered...............");
  //     console.log("Payload:", payload);
  //     const config = {
  //       url: `/orders/addcustomerordereddish/${user._id}`,
  //       method: "put",
  //       baseURL: "https://api.ramsnesthomestay.com/api",
  //       headers: { "Content-Type": "application/json" },
  //       data: payload,
  //     };
  //     const response = await axios.request(config);
  //     if (response.status === 200) {
  //       alert("Order created successfully");
  //       console.log("Order Response : ", response.data);
  //       window.location.assign("/home");
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error placing order:", error);
  //   }
  // };

  const orderDish = async () => {
    console.log("going to ordering...............");
    try {
      const selectedDishesArray = Array.isArray(selectedDishes)
        ? selectedDishes
        : [selectedDishes];

      const formData = new FormData();

      selectedDishesArray.forEach((dish, index) => {
        if (typeof dish === "object") {
          // Check if dish is an object
          Object.entries(dish).forEach(([key, value]) => {
            formData.append(`selectedDishes[${index}][${key}]`, value);
          });
        }
      });
      const config = {
        url: `/orders/addcustomerordereddish/${user._id}`,
        method: "put",
        baseURL: "https://api.ramsnesthomestay.com/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      const response = await axios.request(config);
      if (response.status === 200) {
        alert("Order created successfully");
        console.log("Order Response : ", response.data);
        // window.location.assign("/home");
      }
    } catch (error) {
      // Handle errors
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      {!hasSelectedDishes ? null : (
        <>
          <div
            style={{
              backgroundColor: "#fdb839",
              position: "fixed",
              bottom: 0,
              width: "100%",
            }}
          >
            <div
              className="p-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                // alignContent: "center",
                alignItems: "center",
              }}
            >
              {/* {!hasSelectedDishes ? null : (
          <> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    // padding: "6px",
                    height: "38px",
                    width: "38px",
                    borderRadius: "50px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    class="fa-solid fa-bowl-rice"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>{" "}
                <div className="ms-2" style={{ fontWeight: 500 }}>
                  ₹ {totalAmount.toFixed(2)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "13px", paddingBottom: "5px" }}>
                  {Object.keys(selectedDishes).length} Items in cart
                </div>
                <div
                  style={{
                    padding: "6px",
                    backgroundColor: "#ffefb3",
                    borderRadius: "7px",
                    fontWeight: 500,
                  }}
                  onClick={() => setShow(!show)}
                >
                  {" "}
                  View Order
                </div>
                {/* ({Object.keys(selectedDishes).length}) */}
              </div>
              {/* </> */}
              {/* // )} */}
              <Modal
                // className="offcanva-overlof"
                // responsive="lg"
                show={show}
                fullscreen
                // placement="end"
                onHide={() => setShow(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="p-2">
                    Reservation History{" "}
                    <sup>
                      <i class="fa-solid fa-cart-shopping"></i>{" "}
                      <sup>
                        {" " + Object.keys(selectedDishes).length || 0} Items
                      </sup>
                    </sup>{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                  <div className="row me-0">
                    <div className="col-md-6">
                      <div className="history-left">
                        <h6>Billing Information</h6>
                        <div className="billing-info">
                          <div className="">Name</div>

                          <div className=" "> {user.guestName}</div>
                        </div>
                        <div className="billing-info">
                          <div className="">Mobile Number</div>

                          <div className=" ">+91 {user.mobileNumber}</div>
                        </div>
                        <div className="billing-info">
                          <div className="">No Of Guest</div>

                          <div className=" "> {user.noOfPerson} Person </div>
                        </div>
                        <div className="billing-info">
                          <div className="">Table No</div>
                          <div className=" "> {user.selectedTable}</div>
                        </div>
                        {/* <div className="billing-info">
                          <div className="">Date & Time</div>

                          <div className=" ">
                            {userData.date} & {userData.time}{" "}
                          </div>
                        </div> */}
                      </div>
                      {/* <History dishData={dishData} /> */}
                    </div>
                    <div className="col-md-6">
                      <div className="p-2">
                        {Object.keys(selectedDishes).map((dishId) => (
                          <>
                            <div className="">
                              <div className="main-dish-behaviour">
                                <div>
                                  <h5 className="inner-title-main-dish">
                                    {" "}
                                    {selectedDishes[dishId].name}
                                  </h5>
                                </div>
                                <div>
                                  <h5 className="inner-title-main-dish">
                                    {" "}
                                    ₹{" "}
                                    {selectedDishes[dishId].price *
                                      selectedDishes[dishId]?.count}{" "}
                                  </h5>

                                  <div
                                    style={{
                                      border: "1px solid #fdb839",
                                      padding: "3px",
                                    }}
                                  >
                                    <span>
                                      <button
                                        style={{
                                          border: 0,
                                          backgroundColor: "transparent",
                                        }}
                                        onClick={() =>
                                          decreaseSelectedDishCount(dishId)
                                        }
                                      >
                                        -
                                      </button>
                                    </span>
                                    <span
                                      className="m-2 inner-title-main-dish-cout"
                                      style={{
                                        color: "black",
                                      }}
                                    >
                                      {selectedDishes[dishId]?.count || 0}
                                    </span>
                                    <span>
                                      <button
                                        style={{
                                          border: 0,
                                          backgroundColor: "transparent",
                                        }}
                                        onClick={() =>
                                          increaseSelectedDishCount(dishId)
                                        }
                                      >
                                        +
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </div>
                          </>
                        ))}
                      </div>
                      <div className="amount-section">
                        <div className="total-amount">
                          <div
                            style={{
                              color: "#fdb839",
                              fontSize: "20px",
                              fontWeight: "600",
                            }}
                          >
                            &#x20B9; {totalAmount.toFixed(2)}
                          </div>

                          <small
                            style={{ fontSize: "12px", fontStyle: "italic" }}
                          >
                            Extra charges may apply
                          </small>
                        </div>{" "}
                      </div>
                      <div className="place-order-section" onClick={orderDish}>
                        <h4 style={{ fontSize: "16px" }}>CONFIRM ORDER</h4>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Footer;
