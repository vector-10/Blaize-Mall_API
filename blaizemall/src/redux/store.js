import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productReducers,
  productDetailsReducer,
} from "./reducers/productReducers";
import { userReducer, updateUserReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  auth: userReducer,
  user: updateUserReducer,
});

// contains all data to be put in the state before lodaing the application
let initialState = {};

// contains all the middleware to be used for the application
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
