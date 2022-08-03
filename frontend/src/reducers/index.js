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
  allUsersReducer,
  userDetailsReducer,
  contactReducer,
} from "./userReducers";
import { cartReducer } from "./cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  manageOrdersReducer,
} from "./orderReducers";
import {
  storesReducer,
  storeDetailsReducer,
  newStoreReducer,
  manageStoresReducer,
} from "./storeReducers";
import {
  questionsReducer,
  questionDetailsReducer,
  newQuestionReducer,
  manageQuestionsReducer,
} from "./questionReducers";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  auth: authReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  manageProducts: manageProductsReducer,
  manageOrder: manageOrdersReducer,
  contact: contactReducer,
  newReview: newReviewReducer,
  stores: storesReducer,
  storeDetails: storeDetailsReducer,
  newStore: newStoreReducer,
  manageStore: manageStoresReducer,
  questions: questionsReducer,
  newQuestion: newQuestionReducer,
  questionDetails: questionDetailsReducer,
  manageQuestions: manageQuestionsReducer,
});
