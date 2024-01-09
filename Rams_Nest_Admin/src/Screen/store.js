// store.js
import { createStore } from "redux";

const initialState = {
  invoiceNumber: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GENERATE_NEW_INVOICE":
      return {
        ...state,
        invoiceNumber: state.invoiceNumber + 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
