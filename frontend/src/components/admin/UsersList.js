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
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";

import { DELETE_USER_RESET } from "../../constants/userConstants";

import "../../styles/productslist.css";

const UsersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, alert, isDeleted, history]);

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
              to={`/admin/user/${data}`}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
              // onClick={() => updateProductHandler(data)}
            >
              Update User
            </Link>
          </li>
          <li>
            <span
              style={{ cursor: "pointer" }}
              className="dropdown-item text-danger"
              onClick={() => deleteUserHandler(data)}
            >
              Delete User
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const nameFormatter = (data) => {
    return data;
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
        page: users.length,
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
      text: "User Id",
      sort: true,
      classes: "no-border-right text table-data-customize",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
      formatter: nameFormatter,
      headerFormatter: headerFormatter,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      classes: "no-border-right no-border-left text table-data-customize",
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
      dataField: "role",
      text: "Role",
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

    users.forEach((user) => {
      data.push({
        id: user._id,
        name: user.userName,
        email: user.userEmail,
        status: user.userStatus,
        role: user.userRole,
        action: user._id,
      });
    });
    return data;
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <MetaData title="All Users" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex p-0">
          <h1 className="text admin-main-heading">All Users</h1>
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

export default UsersList;
