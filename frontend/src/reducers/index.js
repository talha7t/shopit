import { combineReducers } from "redux";

import { productsReducer, productDetailsReducer } from "./productsReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./userReducers";
import { cartReducer } from "./cartReducers";
import { newOrderReducer } from "./orderReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});
