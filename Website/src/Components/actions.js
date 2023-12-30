import axios from "axios";

// // actions.js
export const addDish = (dishId, dishName, price, image) => ({
  type: "ADD_DISH",
  payload: { dishId, dishName, price, image },
});

export const increaseDishCount = (dishId) => ({
  type: "INCREASE_DISH_COUNT",
  payload: { dishId },
});

export const decreaseDishCount = (dishId) => ({
  type: "DECREASE_DISH_COUNT",
  payload: { dishId },
});

export const removeDish = (dishId) => ({
  type: "REMOVE_DISH",
  payload: { dishId },
});

// export const orderDishAction = (customerDetails, selectedDishes) => {
//   return async (dispatch) => {
//     try {
//       const payload = {
//         customerDetails,
//         selectedDishes,
//       };
//       console.log("Sending API request with payload:", payload);
//       // Make an API call to order dishes
//       const response = await axios.post("/api/orders/orderdish", payload);
//       console.log("API response:", response.data);
//       // Dispatch a success action if needed
//       dispatch({ type: "ORDER_DISH_SUCCESS", payload: response.data });
//     } catch (error) {
//       // Dispatch an error action if needed
//       console.error("Error in API request:", error);
//       dispatch({ type: "ORDER_DISH_ERROR", payload: error.message });
//     }
//   };
// };
export const orderDishAction = (customerDetails, selectedDishes) => {
  return async (dispatch) => {
    try {
      const payload = {
        customerDetails,
        selectedDishes,
      };

      // Make an API call to order dishes
      const response = await axios.post("/api/orders/orderdish", payload);

      // Dispatch a success action if needed
      dispatch({ type: "ORDER_DISH_SUCCESS", payload: response.data });
    } catch (error) {
      // Dispatch an error action if needed
      dispatch({ type: "ORDER_DISH_ERROR", payload: error.message });
    }
  };
};
