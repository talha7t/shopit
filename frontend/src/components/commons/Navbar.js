// import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useAlert } from "react-alert";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";

import "../../styles/navbar.css";
import "../../App.css";

const Navbar = () => {
  // sidebar open close js code
  let navLinks = document.querySelector(".nav-links");

  const menuOpen = () => {
    navLinks.style.left = "0";
  };
  const menuClose = () => {
    navLinks.style.left = "-100%";
  };

  const handleArrow = () => {
    navLinks.classList.toggle("show3");
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());

    alert.success("Logged out successfully");
  };

  return (
    <nav>
      <div className="navbar">
        <i onClick={menuOpen} className="bx bx-menu"></i>
        <div className="logo">
          <Link className="text-link" style={{ textDecoration: "none" }} to="/">
            SHOP IT
          </Link>
        </div>
        <div className="nav-links">
          <div className="sidebar-logo">
            <Link to="/" className="logo-name text-link">
              SHOP IT
            </Link>
            <i onClick={menuClose} className="bx bx-x"></i>
          </div>
          <ul className="links">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <a href="#">PRODUCTS</a>
            </li>
            <li>
              <a href="#">CONTACT</a>
            </li>
            <li>
              <Link to="/cart" className="">
                CART({cartItems.length})
              </Link>
            </li>
            <li>
              {user ? (
                <>
                  <div onClick={handleArrow}>
                    <span href="#">{user && user.userName}</span>
                    <i className="bx bxs-chevron-down js-arrow arrow"></i>
                  </div>
                  <ul className="js-sub-menu sub-menu">
                    <li>
                      {user && user.userRole !== "admin" ? (
                        <Link to="/orders/me">Orders</Link>
                      ) : (
                        <Link to="/dashboard">Dashboard</Link>
                      )}
                    </li>
                    <li>
                      <Link to="/me">Profile</Link>
                    </li>
                    <li>
                      <Link
                        className=" text-danger"
                        to="/"
                        onClick={logoutHandler}
                      >
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                !loading && (
                  <Link to="/login" data-toggle="collapse">
                    LOGIN
                  </Link>
                )
              )}
            </li>
          </ul>
        </div>

        {/* remove the line below to move links to right  */}
        <div className="search-box"></div>
      </div>
    </nav>
  );
};

export default Navbar;
