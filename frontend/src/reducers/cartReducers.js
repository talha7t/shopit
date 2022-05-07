import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state;
  }
};
