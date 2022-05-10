import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckoutSteps } from "./CheckoutSteps";
import { MetaData } from "../commons/MetaData";

export const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //   calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  //   calulating shipping price
  const shippingPrice = itemsPrice > 500 ? 0 : 100;

  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps shipping confirmOrder />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user && user.userName}
            </p>
            <p>
              <b>Phone:</b>
              {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>
            {cartItems.map((item) => (
              <div key={item.product}>
                <hr />
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt="Laptop"
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/products/${item.product}`}>
                        {item.productName}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x Rs. {item.price} ={" "}
                        <b>Rs. {(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">Rs. {itemsPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">
                  Rs. {shippingPrice}
                </span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">Rs. {totalPrice}</span>
              </p>

              <hr />
              <button
                onClick={proceedToPayment}
                id="checkout_btn"
                className="btn btn-primary btn-block"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
