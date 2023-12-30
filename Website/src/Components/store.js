import { combineReducers, createStore } from "redux";
import dishReducer from "./reducers";

const rootReducer = combineReducers({
  dishes: dishReducer,
  // ... other reducers if needed
});

const store = createStore(rootReducer);

export default store;

// import { createStore, applyMiddleware } from "redux";
// // import thunk from "redux-thunk";
// import { thunk } from "redux-thunk";
// import rootReducer from "./reducers"; // Import your root reducer

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
