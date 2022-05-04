import { combineReducers } from "redux";

import { productsReducer, productDetailsReducer } from "./productsReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./userReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
});
