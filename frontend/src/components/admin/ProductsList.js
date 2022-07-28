import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAlert } from "react-alert";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  adminGetProducts,
  clearErrors,
  deleteProduct,
  updateProduct,
} from "../../actions/productsAction";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";

import "../../styles/productslist.css";

const ProductsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.manageProducts
  );

  useEffect(() => {
    dispatch(adminGetProducts());

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
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, deleteError, isDeleted, history]);

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

  const priceFormatter = (data) => {
    return `Rs. ${data}`;
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
              to={`/admin/product/${data}`}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              onClick={() => updateProductHandler(data)}
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
        page: products.length,
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
      dataField: "productModel",
      text: "Model",
      sort: true,
      classes: "no-border-right text table-data-customize",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "productName",
      text: "Product Name",
      // sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
    },
    {
      dataField: "maxPrice",
      text: "Max Price",
      sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
      headerFormatter: headerFormatter,
      formatter: priceFormatter,
    },
    {
      dataField: "minPrice",
      text: "Min Price",
      sort: true,
      classes: "no-border-left no-border-right text table-data-customize",
      headerFormatter: headerFormatter,
      formatter: priceFormatter,
    },
    {
      dataField: "productGender",
      text: "Gender",
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

    products.forEach((product) => {
      data.push({
        productModel: product.productModel,
        productName: product.productName,
        maxPrice: product.productPriceMax,
        minPrice: product.productPriceMin,
        productGender: product.productGender,
        action: product._id,
      });
    });
    return data;
  };

  const updateProductHandler = (id) => {
    // console.log(id);
    dispatch(updateProduct(id));
  };
  const deleteProductHandler = (id) => {
    // console.log(id);
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <MetaData title="All Products" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex justify-content-between p-0">
          <h1 className="text admin-main-heading">All products</h1>
          <button className="create-btn me-5 d-flex align-items-center">
            <Link to="/admin/product" className="text-link px-3 py-0">
              Create Product
            </Link>
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mx-5 mt-3">
            <ToolkitProvider
              data={setData()}
              keyField="productModel"
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

export default ProductsList;
