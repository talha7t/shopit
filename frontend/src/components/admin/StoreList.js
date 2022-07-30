import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAlert } from "react-alert";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import { DELETE_STORE_RESET } from "../../constants/storeConstants";
import {
  adminGetStores,
  deleteStore,
  clearErrors,
} from "../../actions/storeActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";

import "../../styles/productslist.css";

const StoreList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, stores } = useSelector((state) => state.stores);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.manageStore
  );

  useEffect(() => {
    dispatch(adminGetStores());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product deleted successfully");
      history.push("/admin/stores");
      dispatch({ type: DELETE_STORE_RESET });
    }
  }, [dispatch, error, alert, history, deleteError, isDeleted]);

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
              to={`/admin/store/${data}`}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
            >
              Update
            </Link>
          </li>
          <li>
            <span
              style={{ cursor: "pointer" }}
              className="dropdown-item text-danger"
              onClick={() => deleteProductHandler(data)}
            >
              Delete
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const sizePerPageRenderer = ({
    values = [
      {
        text: "5",
        page: 5,
      },
      {
        text: "10",
        page: 10,
      },
      {
        text: "50",
        page: 50,
      },
      {
        text: "All",
        page: stores.length,
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
      dataField: "storeId",
      text: "Store Id",
      sort: true,
      classes: "no-border-right text table-data-customize",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "storeName",
      text: "Store Name",
      // sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
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

    stores.forEach((store) => {
      data.push({
        storeId: store.storeId,
        storeName: store.storeName,
        action: store._id,
      });
    });
    return data;
  };

  const deleteProductHandler = (id) => {
    // console.log(id);
    dispatch(deleteStore(id));
  };

  return (
    <>
      <MetaData title="All Stores" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex justify-content-between p-0">
          <h1 className="text admin-main-heading">All Stores</h1>
          <button className="create-btn me-5 d-flex align-items-center">
            <Link to="/admin/store" className="text-link px-3 py-0">
              Add Store
            </Link>
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mx-5 mt-3">
            <ToolkitProvider
              data={setData()}
              keyField="storeId"
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

export default StoreList;
