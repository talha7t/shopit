import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAlert } from "react-alert";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

import "../../styles/productslist.css";

const OrdersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.manageOrder);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, alert, history, isDeleted]);

  // table related stuff
  const headerClasses = "customize-header";
  const rowClasses = "row-customize";
  const { SearchBar } = Search;

  const headerFormatter = (data) => {
    return (
      <span style={{ cursor: "pointer" }}>
        {data.text} <i className="fas fa-angle-down"></i>
      </span>
    );
  };

  const actionFormatter = (data) => {
    return (
      <div className="dropdown">
        <i
          className="fa fa-cog 2x"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></i>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link
              to={`/admin/order/${data}`}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              // onClick={() => updateProductHandler(data)}
            >
              Update Order
            </Link>
          </li>
          <li>
            <span
              style={{ cursor: "pointer" }}
              className="dropdown-item text-danger"
              onClick={() => deleteOrderHandler(data)}
            >
              Delete Order
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const priceFormatter = (data) => {
    return `Rs. ${data}`;
  };

  const sizePerPageRenderer = ({
    values = [
      {
        text: "1",
        page: 1,
      },
      {
        text: "2",
        page: 2,
      },
      {
        text: "3",
        page: 3,
      },
      {
        text: "All",
        page: orders.length,
      },
    ],
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className="btn-group" role="group">
      {values.map((option) => {
        const isSelect = currSizePerPage === `${option.page}`;
        return (
          <button
            key={option.text}
            type="button"
            onClick={() => onSizePerPageChange(option.page)}
            className={`btn ${isSelect ? "btn-selected" : "btn-unselected"}`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );

  const options = {
    paginationSize: 4,
    // showTotal: true,
    pageStartIndex: 1,
    withFirstAndLast: true,
    firstPageText: "First",
    lastPageText: "Last",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    disablePageTitle: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer,
  };

  const columns = [
    {
      dataField: "id",
      text: "Order Id",
      sort: true,
      classes: "no-border-right text table-data-customize",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
      formatter: priceFormatter,
      headerFormatter: headerFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      classes: "no-border-left text table-data-customize",
      formatter: actionFormatter,
    },
  ];

  const setData = () => {
    let data = [];

    orders.forEach((order) => {
      data.push({
        id: order._id,
        amount: order.totalPrice,
        status: order.orderStatus,
        action: order._id,
      });
    });
    return data;
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <MetaData title="All Orders" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex p-0">
          <h1 className="text admin-main-heading">All Orders</h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mx-5 mt-3">
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
                    pagination={paginationFactory(options)}
                    bordered={false}
                    headerClasses={headerClasses}
                    rowClasses={rowClasses}
                    {...props.baseProps}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        )}
      </section>
    </>
  );
};

export default OrdersList;
