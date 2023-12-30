import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";

function Header() {
  const user = JSON.parse(sessionStorage.getItem("Customer Details"));
  const [showOptions, setShowOptions] = useState(false);
  const [myOrders, setMyOrders] = useState({});
  const [selectedDishes, setSelectedDishes] = useState([]);

  useEffect(() => {
    getAllOrderDetails();
  }, []);

  const getAllOrderDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.ramsnesthomestay.com/api/orders/getparticularcustomerbookingdetails/${user._id}`
      );
      if (res.status === 200 && res.data?.particulatUser) {
        setMyOrders(res.data.particulatUser);
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
  console.log("myOrders", selectedDishes.length);

  // const dispatch = useDispatch();
  // const selectedDishes = useSelector((state) => state.dishes.selectedDishes);
  // const hasSelectedDishes = Object.keys(selectedDishes).length > 0;
  // // console.log("selectedDishes in header component", selectedDishes);
  // const [show, setShow] = useState(false);

  // const increaseSelectedDishCount = (dishId) => {
  //   dispatch(increaseDishCount(dishId));
  // };

  // const decreaseSelectedDishCount = (dishId) => {
  //   if (selectedDishes[dishId]?.count > 1) {
  //     dispatch(decreaseDishCount(dishId));
  //   } else {
  //     dispatch(removeDish(dishId));
  //   }
  // };

  // const removeSelectedDish = (dishId) => {
  //   dispatch(removeDish(dishId));
  // };

  // const findingTotal = () => {
  //   return Object.values(selectedDishes).reduce(
  //     (acc, curr) => acc + curr.price * curr.count,
  //     0
  //   );
  // };

  // const [totalAmount, setTotalAmount] = useState(0);

  // useEffect(() => {
  //   if (
  //     Object.keys(selectedDishes).length === 0 ||
  //     Object.keys(selectedDishes).length < 0
  //   ) {
  //     setShow(false);
  //   } else {
  //     setTotalAmount(findingTotal());
  //   }
  // }, [selectedDishes]);

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "white",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        }}
      >
        <Container>
          <Navbar.Brand href="/home">
            <img src="/img/logo.png" alt="logo" width="117px" />
          </Navbar.Brand>
          <Navbar.Toggle />
          {selectedDishes.length === 0 || selectedDishes.length < 0 ? (
            ""
          ) : (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ margin: "0px 30px" }}>
                <div>
                  <i
                    class="fa-solid fa-ellipsis-vertical"
                    onClick={() => setShowOptions(!showOptions)}
                  ></i>
                </div>{" "}
                {/* <CartIcon onClick={() => history.push("/cart")} />{" "} */}
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      {showOptions && (
        <div>
          <div className="showOptions">
            <a href="/my-orders">
              {" "}
              <div>
                <i class="fa-solid fa-cookie-bite"></i> My Orders
              </div>{" "}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
