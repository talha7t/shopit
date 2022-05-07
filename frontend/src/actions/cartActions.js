import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addItemToCart =
  (id, quantity, size, stock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    // const stock = data.inventory.filter((item) => {
    //   if (item.size === size) return item.size;
    // });
    // console.log(data);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        productName: data.product.productName,
        price: data.product.productPriceMax,
        image: data.product.productImages[0].url,
        // [stock]: stock,
        stock: stock,
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
