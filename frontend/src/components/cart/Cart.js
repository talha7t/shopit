import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productsAction";
import { addItemToCart } from "../../actions/cartActions";

import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";

import "../../styles/cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  const decreaseQuantity = (id, quantity, stock, size) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;
    else dispatch(addItemToCart(id, newQty, size, stock));
  };

  const increaseQuantity = (id, quantity, stock, size) => {
    console.log(cartItems);
    const newQty = quantity + 1;
    if (newQty > stock) {
      return;
    } else {
      dispatch(addItemToCart(id, newQty, size, stock));
    }
  };

  return (
    <>
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Cart is Empty</h2>
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
                          <div className="col-4 col-lg-3">
                            <img
                              src={item.image}
                              alt="Laptop"
                              height="90"
                              width="115"
                            />
                          </div>

                          <div className="col-5 col-lg-3">
                            <Link to={`/products/${item.product}`}>
                              {item.productName}
                            </Link>
                            <br />
                            <p className="cart_product-size mt-2">
                              Size: {item.size}
                            </p>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">Rs. {item.price}</p>
                          </div>

                          <div className="col-6 col-md-4 col-lg-3 mt-4 mt-lg-0">
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
                              //   ref={quantityRef}
                              // value={quantity}
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

                          <div className="col-4 col-lg-1 mt-4 mt-lg-3 ">
                            <i
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
                    <span className="order-summary-values">3 (Units)</span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">$765.56</span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
