import { combineReducers } from "redux";

import { productsReducer, productDetailsReducer } from "./productsReducers";
import { authReducer } from "./userReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
});
