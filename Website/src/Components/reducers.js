// reducers.js
const initialState = {
  selectedDishes: {},
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DISH":
      return {
        ...state,
        selectedDishes: {
          ...state.selectedDishes,
          [action.payload.dishId]: {
            name: action.payload.dishName,
            price: action.payload.price,
            image: action.payload.image,
            count: 1,
          },
        },
      };

    // case "INCREASE_DISH_COUNT":
    //   return {
    //     ...state,
    //     selectedDishes: {
    //       ...state.selectedDishes,
    //       [action.payload.dishId]: {
    //         ...state.selectedDishes[action.payload.dishId],
    //         count:
    //           (state.selectedDishes[action.payload.dishId]?.count || 0) + 1,
    //       },
    //     },
    //   };

    case "INCREASE_DISH_COUNT":
      return {
        ...state,
        selectedDishes: {
          ...state.selectedDishes,
          [action.payload.dishId]: {
            ...state.selectedDishes[action.payload.dishId],
            count: state.selectedDishes[action.payload.dishId].count + 1,
          },
        },
      };

    // case "DECREASE_DISH_COUNT":
    //   const currentCount =
    //     state.selectedDishes[action.payload.dishId]?.count || 0;
    //   const newCount = Math.max(0, currentCount - 1);

    //   if (newCount === 0) {
    //     const { [action.payload.dishId]: _, ...restSelectedDishes } =
    //       state.selectedDishes;
    //     return {
    //       ...state,
    //       selectedDishes: restSelectedDishes,
    //     };
    //   }

    //   return {
    //     ...state,
    //     selectedDishes: {
    //       ...state.selectedDishes,
    //       [action.payload.dishId]: {
    //         ...state.selectedDishes[action.payload.dishId],
    //         count: newCount,
    //       },
    //     },
    //   };

    case "DECREASE_DISH_COUNT":
      if (state.selectedDishes[action.payload.dishId].count === 1) {
        return {
          ...state,
          selectedDishes: {
            ...state.selectedDishes,
            [action.payload.dishId]: undefined,
          },
        };
      } else {
        return {
          ...state,
          selectedDishes: {
            ...state.selectedDishes,
            [action.payload.dishId]: {
              ...state.selectedDishes[action.payload.dishId],
              count: state.selectedDishes[action.payload.dishId].count - 1,
            },
          },
        };
      }

    case "REMOVE_DISH":
      const { [action.payload.dishId]: _, ...restSelectedDishes } =
        state.selectedDishes;
      return {
        ...state,
        selectedDishes: restSelectedDishes,
      };

    case "ORDER_DISH_SUCCESS":
      // Handle success, update state if needed
      return state;

    case "ORDER_DISH_ERROR":
      // Handle error, update state if needed
      return state;

    default:
      return state;
  }
};

export default dishReducer;
