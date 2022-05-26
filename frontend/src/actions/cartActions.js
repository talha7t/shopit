import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPINNG_INFO,
} from "../constants/cartConstants";

export const addItemToCart =
  // (id, quantity, size, stock) => async (dispatch, getState) => {
  (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        productName: data.product.productName,
        price: data.product.productPriceMax,
        image: data.product.productImages[0].url,
        // [stock]: stock,
        // stock: stock,
        size: size,
        quantity: quantity,
      },
    });

    // save cart items to local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPINNG_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
