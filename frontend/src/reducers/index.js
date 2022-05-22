import { combineReducers } from "redux";

import {
  productsReducer,
  productDetailsReducer,
  newProductReducer,
  manageProductsReducer,
  newReviewReducer,
} from "./productsReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./userReducers";
import { cartReducer } from "./cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  manageOrdersReducer,
} from "./orderReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  manageProducts: manageProductsReducer,
  manageOrder: manageOrdersReducer,
  newReview: newReviewReducer,
});
