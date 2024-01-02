import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { useInvoice } from "./InvoiceContext";

function CustomerOrderHistoryDetails() {
  const { id } = useParams();
  const [allFood, setAllFoods] = useState([]);
  const [customerOrders, setCustomerOrders] = useState({});
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState(1);

  useEffect(() => {
    getAllOrderDetails();
    getAllFoods();
  }, []);

  const getAllOrderDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.ramsnesthomestay.com/api/orders/getparticularcustomerbookingdetails/${id}`
      );
      if (res.status === 200 && res.data?.particulatUser) {
        setCustomerOrders(res.data.particulatUser);
        console.log("customerOrders", res.data.particulatUser);
        const dishes = res.data.particulatUser.selectedDishes || [];
        // console.log("dishes", dishes);
        const dishesWithTotalPrice = dishes.map((dish) => ({
          ...dish,
          totalPrice: dish.price * dish.count,
        }));
        // console.log("dishesWithTotalPrice", dishesWithTotalPrice);
        setSelectedDishes(dishesWithTotalPrice);
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // index value of the objects?

  const getAllFoods = async () => {
    let res = await axios.get(
      "https://api.ramsnesthomestay.com/api/getallfood"
    );
    if ((res.status = 200)) {
      // console.log("food response", res.data);
      setAllFoods(res.data?.foods);
    }
  };
  // const totalAmount = selectedDishes.reduce(
  //   (acc, items) => acc + parseInt(items.price) * parseInt(items.count),
  //   0
  // );
  const mergedArray = selectedDishes.map((item) => {
    const matchedFood = allFood.find((food) => food.foodname === item.name);

    return {
      name: item.name,
      price: item.price,
      count: item.count,
      _id: item._id,
      totalPrice: item.totalPrice,
      foodimage: matchedFood ? matchedFood.foodimage : null,
    };
  });
  const totalAmount = mergedArray.reduce(
    (acc, items) => acc + parseInt(items.totalPrice) * parseInt(items.count),
    0
  );

  function generateNewInvoiceData() {
    setInvoiceNumber((prevInvoiceNumber) => prevInvoiceNumber + 1);
    return {
      invoiceNumber,
    };
  }

  return (
    <div className="row me-0">
      <Header />
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 v1 mt-5">
        <h5 className="orderdetails-head">Order Id : #{id.slice(-5)} </h5>
        <div>{customerOrders.guestName} </div>
        <div>{customerOrders.mobileNumber} </div>
        <div>
          Table No {customerOrders.selectedTable} / {customerOrders.noOfPerson}{" "}
          Persons
        </div>
        {customerOrders.foodStatus === "delivered" && (
          <div className="print-invoice-text">
            <Link
              className="p-2"
              to={{
                pathname: `/print-invoice/${id}`,
                state: { generateNewInvoice: generateNewInvoiceData },
              }}
              style={{
                textDecoration: "none",
                border: "1px solid #0d6efd",
                borderRadius: "5px",
              }}
            >
              <i class="fa-solid fa-download me-1"></i> Generate Invoice
            </Link>
          </div>
        )}
        <br />
        <div className="row">
          {mergedArray.map((items, index) => (
            <div className="col-md-3 col-12 mt-3">
              <div class="card-body-roder px-3">
                <div class="text-center mb-4">
                  <h4 style={{ fontSize: "18px" }}>Dish #{index + 1} </h4>
                </div>
                {/* <hr /> */}
                <div class="order-menu">
                  {/* <h6 class="font-w600">Order Menu</h6> */}
                  <div class="d-flex align-items-center mb-2">
                    <img
                      class="me-2"
                      src={`https://api.ramsnesthomestay.com/food/${items.foodimage}`}
                      alt=""
                    />
                    <div class="order-items">
                      <h6 class="font-w500 text-nowrap mb-0">
                        <div style={{ fontSize: "13px" }}>{items.name} </div>
                      </h6>
                      <p class="mb-0" style={{ fontSize: "13px" }}>
                        x{items.count}
                      </p>
                      <h6 class="" style={{ fontSize: "13px" }}>
                        {items.totalPrice.toFixed(2)}
                      </h6>
                    </div>
                  </div>

                  {/* <a
                    href="javascript:void(0);"
                    class="btn btn-outline-success bgl-success btn-block"
                  >
                    Completed
                  </a> */}
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h4 class="mb-0">Total</h4>
            <h4 class="mb-0 text-primary"> {totalAmount.toFixed(2)} </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderHistoryDetails;
