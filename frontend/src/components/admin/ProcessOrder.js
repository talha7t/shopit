import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import SideBar from "./SideBar";

const ProcessOrder = ({ history, match }) => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus } =
    order;
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated } = useSelector((state) => state.manageOrder);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [alert, error, isUpdated, orderId, dispatch]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  let isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  if (!isPaid) {
    paymentInfo &&
    paymentInfo.paymentMethod === "byHand" &&
    order.orderStatus === "delivered"
      ? (isPaid = true)
      : (isPaid = false);
  }

  // if (paymentInfo) {
  //   paymentInfo.paymentMethod === "byHand" && status === "delivered"
  //     ? (isPaid = true)
  //     : (isPaid = false);
  // }
  const updateOrderHandler = (id) => {
    // e.preventDefault();

    if (paymentInfo) {
      paymentInfo.paymentMethod === "byHand" && status === "delivered"
        ? (paymentInfo.status = true)
        : (paymentInfo.status = false);
    }

    const formData = new FormData();

    formData.set("orderStatus", status);
    formData.set("paymentInfo", paymentInfo);

    dispatch(updateOrder(id, formData));
  };

  return (
    <>
      <MetaData title="Process Order" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex p-0">
          <h1 className="text admin-main-heading">
            Order # {order && order._id}
          </h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mx-5 mt-3">
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-7 order-details">
                {/* <h1 className="my-5">Order # {order && order._id}</h1> */}

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

                {paymentInfo && paymentInfo.paymentMethod === "byCard" ? (
                  <>
                    {" "}
                    <h4 className="my-4">Stripe ID</h4>
                    <p className="greenColor">
                      <b>{paymentInfo && paymentInfo.id}</b>
                    </p>
                  </>
                ) : (
                  <>
                    {" "}
                    <h4 className="my-4">User ID</h4>
                    <p className="greenColor">
                      <b>{user && user._id}</b>
                    </p>
                  </>
                )}

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

              <div className="col-12 col-lg-3 mt-5">
                <h4 className="my-4">Status</h4>

                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-block mt-3"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProcessOrder;
