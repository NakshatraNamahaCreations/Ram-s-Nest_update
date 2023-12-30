import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import FoodStepper from "./FoodStepper";

function MyOrders() {
  const user = JSON.parse(sessionStorage.getItem("Customer Details"));
  const [myOrders, setMyOrders] = useState({});
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [allFood, setAllFoods] = useState([]);
  // const customerOrders = {};
  console.log("user", user);
  useEffect(() => {
    getAllOrderDetails();
    getAllFoods();
  }, []);

  const getAllOrderDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.ramsnesthomestay.com/api/orders/getparticularcustomerbookingdetails/${user._id}`
      );
      if (res.status === 200 && res.data?.particulatUser) {
        setMyOrders(res.data.particulatUser);
        console.log("customerOrders in myorders page", res.data.particulatUser);
        const dishes = res.data.particulatUser.selectedDishes || [];
        // console.log("dishes", dishes);
        const dishesWithTotalPrice = dishes.map((dish) => ({
          ...dish,
          totalPrice: dish.price * dish.count,
        }));
        console.log("dishesWithTotalPrice", dishesWithTotalPrice);
        setSelectedDishes(dishesWithTotalPrice);
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
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
  console.log("mergedArray", mergedArray);
  const totalAmount = mergedArray.reduce(
    (acc, items) => acc + parseInt(items.totalPrice) * parseInt(items.count),
    0
  );

  return (
    <div>
      <div className="container">
        <div className="mt-5">
          <div>
            <h5 className="orderdetails-head text-center">
              Order#{user._id.slice(-5)}{" "}
            </h5>
          </div>
          <div className="order-tracks">
            <FoodStepper foodStatus={myOrders.foodStatus} />
            {/* <Stepper
              activeStep={1}
              activeBgColor={
                myOrders.foodStatus === "startCooking"
                  ? "#ffbb46"
                  : myOrders.foodStatus === "readyToServe"
                  ? "#ffbb46"
                  : myOrders.foodStatus === "delivered"
                  ? "#ffbb46"
                  : ""
              }
            >
              <Step label="Received" />
              <Step label="Preparing" />
              <Step label="Ready" />
            </Stepper> */}
            {/* <div
              allowClickControl={false}
              activeColor={
                myOrders.foodStatus === "startCooking"
                  ? "#ffbb46"
                  : myOrders.foodStatus === "readyToServe"
                  ? "#ffbb46"
                  : myOrders.foodStatus === "delivered"
                  ? "#ffbb46"
                  : ""
              }
            >
              <div>Received</div>
              <div>Preparing</div>
              <div>Ready</div>
            </div> */}
          </div>

          {/* <br /> */}
          <div className="row">
            <div class="text-center">
              <h4 style={{ fontSize: "18px" }}> Order Menu </h4>
              <p className="orderdetails-head">
                Placed On : {moment(myOrders.orderingTime).format("lll")}
              </p>
            </div>

            {mergedArray.map((items, index) => (
              <div className="col-md-3 col-12">
                <div class="card-body-roder px-3">
                  <div class="order-menu">
                    <h6 class="font-w600">Dish #{index + 1}</h6>
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
              <h4 class="mb-0" style={{ color: "#ffbb46" }}>
                {totalAmount.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
