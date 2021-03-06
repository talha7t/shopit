import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAlert } from "react-alert";
import { myOrders, clearErrors } from "../../actions/orderActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const linkFormatter = (data) => {
    return (
      <Link
        style={{ color: "#000", textDecoration: "underline" }}
        to={`/order/${data}`}
      >
        {data}
      </Link>
    );
  };
  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      sort: true,
      formatter: linkFormatter,
    },
    {
      dataField: "numOfItems",
      text: "Num of Items",
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
  ];

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const setData = () => {
    let data = [];
    orders.forEach((order) => {
      data.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: order.totalPrice,
        status: order.orderStatus,
      });
    });
    return data;
  };

  return (
    <>
      <MetaData title="My Orders" />

      <h1 className="mt-5 mb-5 ms-5">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <BootstrapTable
            data={setData()}
            keyField="id"
            columns={columns}
            pagination={paginationFactory()}
            striped
            hover
            condensed
          />
        </div>
      )}
    </>
  );
};

export default ListOrders;
