import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { MetaData } from "../commons/MetaData";

import "../../styles/cart.css";

export const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const decreaseQuantity = (id, quantity, stock, size) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;
    else dispatch(addItemToCart(id, newQty, size, stock));
  };

  const increaseQuantity = (id, quantity, stock, size) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      return;
    } else {
      // dispatch(addItemToCart(id, newQty, size, stock));
      dispatch(addItemToCart(id, newQty, size));
    }
  };

  const removeCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    // if the user is not logged in redirect to login
    history.push("/login?redirect=shipping");

    // history.push("/shipping");
  };

  return (
    <div className="container">
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <h2 className="mt-5 cart-heading">Cart is Empty</h2>
      ) : (
        <>
          <div className="container container-fluid">
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length}</b>
            </h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => {
                  return (
                    <div key={item.product}>
                      <hr />
                      <div className="cart-item">
                        <div className="row">
                          <div className="col-4 col-lg-3 align-self-start">
                            <img
                              src={item.image}
                              alt="Laptop"
                              height="90"
                              width="115"
                            />
                          </div>

                          <div className="col-5 col-lg-3 align-self-start">
                            <Link to={`/products/${item.product}`}>
                              {item.productName}
                            </Link>
                            <br />
                            <p className="cart_product-size mt-2">
                              Size: {item.size}
                            </p>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0 align-self-start">
                            <p id="card_item_price">Rs. {item.price}</p>
                          </div>

                          <div className="col-6 col-md-4 col-lg-3 mt-4 mt-lg-0 align-self-start">
                            <span
                              onClick={() =>
                                decreaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock,
                                  item.size
                                )
                              }
                              className="minus d-inline-flex align-items-center"
                            >
                              <i className="fas fa-minus"></i>
                            </span>
                            <input
                              type="number"
                              className="count d-inline-block"
                              value={item.quantity}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock,
                                  item.size
                                )
                              }
                              className="plus d-inline-flex align-items-center "
                            >
                              <i className="fas fa-plus"></i>
                            </span>
                          </div>

                          <div className="col-4 col-lg-1 mt-2 align-self-start ">
                            <i
                              onClick={() => removeCartItem(item.product)}
                              id="delete_cart_item"
                              className="fas fa-trash"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <hr />
              </div>

              <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">
                      Rs.{" "}
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                      {/* to fixed rounds of to two decimal number */}
                    </span>
                  </p>

                  <hr />
                  <button
                    onClick={checkoutHandler}
                    id="checkout_btn"
                    className="btn btn-primary"
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
