import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAlert } from "react-alert";
import { myOrders, clearErrors } from "../../actions/orderActions";
import { MetaData } from "../commons/MetaData";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import Loader from "../commons/Loader";

const MyOrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { SearchBar } = Search;
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
      ) : orders.length > 0 ? (
        <div className="container">
          <p className="order-note">
            <span>Note:</span> Click on order ID to view details
          </p>
          <ToolkitProvider
            data={setData()}
            keyField="id"
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  className="custom-search-field"
                />
                <hr />
                <BootstrapTable
                  classes="row-border-spacing"
                  pagination={paginationFactory()}
                  bordered={false}
                  //   headerClasses={headerClasses}
                  //   rowClasses={rowClasses}
                  {...props.baseProps}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      ) : (
        <p className="ms-5">You have no orders</p>
      )}
    </>
  );
};

export default MyOrdersList;
