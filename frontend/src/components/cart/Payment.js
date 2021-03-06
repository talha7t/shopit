import React, { useEffect, useRef } from "react";
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

export const Payment = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    submitRef.current.disabled = true;
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
      console.log(error.respomse.data.message);
      submitRef.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title="Payment" />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper justify-content-center">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
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
        </div>
      </div>
    </>
  );
};
