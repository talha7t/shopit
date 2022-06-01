import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";

const OrderDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, match.params.id]);

  if (!order) {
    return;
  }

  const { orderItems, shippingInfo, paymentInfo, totalPrice, orderStatus } =
    order;

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  let isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  paymentInfo &&
  paymentInfo.paymentMethod === "byHand" &&
  order.orderStatus === "delivered"
    ? (isPaid = true)
    : (isPaid = false);
  return (
    <>
      <MetaData title="Order Details" />

      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 style={{ fontSize: "2.25rem" }} className="my-5">
                Order # {order._id}
              </h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.userName}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b> Rs. {totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "green" : "red"}>
                <b>{isPaid ? "Paid" : "Not Paid"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("delivered")
                    ? "green"
                    : "red"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => {
                    return (
                      <div key={item.product} className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.productName}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link
                            style={{ textDecoration: "underline" }}
                            to={`/products/${item.product}`}
                          >
                            {item.productName}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>Rs. {item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
