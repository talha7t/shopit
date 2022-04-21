import { combineReducers } from "redux";

import { productsReducer, productDetailsReducer } from "./productsReducer";

export default combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
});
