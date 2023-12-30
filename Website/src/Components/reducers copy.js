// // reducers.js
// const initialState = {
//   selectedDishes: {},
// };

// const dishReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_DISH":
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]:
//             (state.selectedDishes[action.payload.dishId] || 0) + 1,
//         },
//       };

//     case "INCREASE_DISH_COUNT":
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]:
//             (state.selectedDishes[action.payload.dishId] || 0) + 1,
//         },
//       };

//     case "DECREASE_DISH_COUNT":
//       const newCount = (state.selectedDishes[action.payload.dishId] || 0) - 1;
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]: newCount > 0 ? newCount : 0,
//         },
//       };

//     default:
//       return state;
//   }
// };

// export default dishReducer;
// reducers.js
const initialState = {
  selectedDishes: {},
};

// const dishReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // case "ADD_DISH":
//     //   return {
//     //     ...state,
//     //     selectedDishes: {
//     //       ...state.selectedDishes,
//     //       [action.payload.dishId]: {
//     //         name: action.payload.dishName,
//     //         price: action.payload.price,
//     //         count: 1,
//     //       },
//     //     },
//     //   };
//     case "ADD_DISH":
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]: {
//             name: action.payload.dishName,
//             price: action.payload.price,
//             count: action.payload.count || 0, // set count to 0 if not provided
//           },
//         },
//       };

//     // case "INCREASE_DISH_COUNT":
//     //   console.log("State before increase:", state);
//     //   console.log("Action payload:", action.payload);
//     //   return {
//     //     ...state,
//     //     selectedDishes: {
//     //       ...state.selectedDishes,
//     //       [action.payload.dishId]: {
//     //         ...state.selectedDishes[action.payload.dishId],
//     //         // count: 0,
//     //         count: state.selectedDishes[action.payload.dishId].count + 1,
//     //       },
//     //     },
//     //   };

//     case "INCREASE_DISH_COUNT":
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]: {
//             ...state.selectedDishes[action.payload.dishId],
//             count:
//               (state.selectedDishes[action.payload.dishId]?.count || 0) + 1,
//           },
//         },
//       };

//     case "DECREASE_DISH_COUNT":
//       return {
//         ...state,
//         selectedDishes: {
//           ...state.selectedDishes,
//           [action.payload.dishId]: {
//             ...state.selectedDishes[action.payload.dishId],
//             count:
//               state.selectedDishes[action.payload.dishId].count > 0
//                 ? state.selectedDishes[action.payload.dishId].count - 1
//                 : 0,
//           },
//         },
//       };

//     case "REMOVE_DISH":
//       // your logic to remove a dish
//       const { [action.payload.dishId]: _, ...restSelectedDishes } =
//         state.selectedDishes;
//       return {
//         ...state,
//         selectedDishes: restSelectedDishes,
//       };

//     default:
//       return state;
//   }
// };

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
            count: 1,
          },
        },
      };

    case "INCREASE_DISH_COUNT":
      return {
        ...state,
        selectedDishes: {
          ...state.selectedDishes,
          [action.payload.dishId]: {
            ...state.selectedDishes[action.payload.dishId],
            count:
              (state.selectedDishes[action.payload.dishId]?.count || 0) + 1,
          },
        },
      };

    case "DECREASE_DISH_COUNT":
      return {
        ...state,
        selectedDishes: {
          ...state.selectedDishes,
          [action.payload.dishId]: {
            ...state.selectedDishes[action.payload.dishId],
            count: Math.max(
              0,
              state.selectedDishes[action.payload.dishId]?.count - 1
            ),
          },
        },
      };

    case "REMOVE_DISH":
      const { [action.payload.dishId]: _, ...restSelectedDishes } =
        state.selectedDishes;
      return {
        ...state,
        selectedDishes: restSelectedDishes,
      };

    default:
      return state;
  }
};

export default dishReducer;
