import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MetaData } from "../commons/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../commons/Loader";
import SideBar from "./SideBar";
import { adminGetProducts } from "../../actions/productsAction";
import { allOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(adminGetProducts());
    dispatch(allOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Dashboard" />
      <SideBar />

      <section className="admin-main-section">
        <div className="text mb-3">Dashboard</div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row mx-5 mb-3">
              <div className="col-xl-12 col-sm-12 mb-3">
                <div className="card dashboard-card text-white bg-primary o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Total Amount
                      <br /> <b>Rs. {totalAmount}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mx-5">
              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card dashboard-card text-white bg-success o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Products
                      <br /> <b>{products && products.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/products"
                  >
                    <span className="float-left">View Details </span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card dashboard-card text-white bg-danger o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Orders
                      <br /> <b>{orders && orders.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/orders"
                  >
                    <span className="float-left">View Details </span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6 mb-3">
                <div className="card dashboard-card text-white bg-info o-hidden h-100">
                  <div className="card-body">
                    <div className="text-center card-font-size">
                      Users
                      <br /> <b>{users && users.length}</b>
                    </div>
                  </div>
                  <Link
                    className="card-footer text-white clearfix small z-1"
                    to="/admin/users"
                  >
                    <span className="float-left">View Details </span>
                    <span className="float-right">
                      <i className="fa fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>

              {/* 
            Uncomment when ready to implement out of stock

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div ="text-center card-font-size">
                    Out of Stock
                    <br /> <b>4</b>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </>
        )}
        {/* <div className=""> */}

        {/* </div> */}
      </section>
    </>
  );
};

export default Dashboard;
