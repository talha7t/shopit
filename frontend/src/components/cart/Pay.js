import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { CheckoutSteps } from "./CheckoutSteps";
import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const options = {
  style: { base: { fontSize: "16px" }, invalid: { color: "#9e2146" } },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const [paymentMethod, setPaymentMethod] = useState("byHand");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const submitRef = useRef();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = { amount: Math.round(orderInfo.totalPrice * 100) };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //     submitRef.current.disabled = true;
    document.getElementById("pay_btn").disabled = true;

    //     manage payment by card
    if (paymentMethod === "byCard") {
      let res;
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };

        res = await axios.post("/api/payment/process", paymentData, config);
        const clientSecret = res.data.client_secret;

        if (!stripe || !elements) {
          return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.userName,
              email: user.userEmail,
            },
          },
        });

        if (result.error) {
          alert.error(result.error.message);
          submitRef.current.disabled = false;
        } else {
          // payment processed or not
          if (result.paymentIntent.status === "succeeded") {
            // create new order
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
              paymentMethod,
            };
            dispatch(createOrder(order));
            history.push("/success");
          } else {
            alert.error(
              "An issue occured while processing payment please try again"
            );
          }
        }
      } catch (error) {
        submitRef.current.disabled = false;
        alert.error(error.response.data.message);
      }
    }
    //     manage payment by hand
    else {
      order.paymentInfo = {
        id: user._id,
        status: "incomplete",
        paymentMethod,
      };

      dispatch(createOrder(order));
      history.push("/success");
    }
  };

  return (
    <>
      <MetaData title="Payment" />

      <CheckoutSteps shipping confirmOrder payment />

      {/* SELECT PAYMENT METHOD */}
      <div className="d-flex mt-5 justify-content-center">
        <div className="form-check me-5 form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="payment-method"
            value="byCard"
            checked={paymentMethod === "byCard"}
            onChange={handlePaymentChange}
            id="card-payment"
          />
          <label className="form-check-label" htmlFor="card-payment">
            Pay by Card
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="payment-method"
            id="delivery-payment"
            value="byHand"
            checked={paymentMethod === "byHand"}
            onChange={handlePaymentChange}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="delivery-payment">
            Pay on Delivery
          </label>
        </div>
      </div>

      {/* RENDER CONTENT BASED ON SELECTED PAYMENT METHOD */}
      <div className="row mx-0 mb-5 wrapper justify-content-center">
        <div className="col-10 col-lg-5">
          {paymentMethod === "byHand" ? (
            <form onSubmit={submitHandler} className="shadow-lg">
              <h3>You will pay when your order arrives</h3>
              <button
                ref={submitRef}
                id="pay_btn"
                type="submit"
                className="btn px-5 btn-block py-3"
              >
                Order
              </button>
            </form>
          ) : (
            <form onSubmit={submitHandler} className="shadow-lg">
              <h1 className="mb-4">Card Details</h1>
              <div className="form-group">
                <label htmlFor="card_num_field">Card Number</label>
                <CardNumberElement
                  type="text"
                  id="card_num_field"
                  className="form-control pt-3"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_exp_field">Card Expiry</label>
                <CardExpiryElement
                  type="text"
                  id="card_exp_field"
                  className="form-control pt-3"
                  options={options}
                />
              </div>

              <div className="form-group">
                <label htmlFor="card_cvc_field">Card CVC</label>
                <CardCvcElement
                  type="text"
                  id="card_cvc_field"
                  className="form-control pt-3"
                  options={options}
                />
              </div>

              <button
                ref={submitRef}
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                Pay {` - ${orderInfo && orderInfo.totalPrice}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
