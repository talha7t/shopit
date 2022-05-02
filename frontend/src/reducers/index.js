import { combineReducers } from "redux";

import { productsReducer, productDetailsReducer } from "./productsReducers";
import { authReducer, userReducer } from "./userReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
});
