import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPINNG_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload; // item to put in the cart

      // check if item exists
      const itemExists = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExists.product ? item : i
          ),
        };
      } else {
        // if item does not exist return whatever is in the cart already, plus the current item
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPINNG_INFO:
      return { ...state, shippingInfo: action.payload };
    default:
      return state;
  }
};
