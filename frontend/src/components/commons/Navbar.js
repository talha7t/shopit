import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useAlert } from "react-alert";

import "../../styles/newNav.css";

// let navbar = document.querySelector(".navbar");

const Navbar = () => {
  // sidebar open close js code
  // let navLinks = document.querySelector(".nav-links");
  // let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  // let menuCloseBtn = document.querySelector(".nav-links .bx-x");
  // menuOpenBtn.onclick = function () {
  //   navLinks.style.left = "0";
  // };

  // menuCloseBtn.onclick = function () {
  //   navLinks.style.left = "-100%";
  // };

  // let jsArrow = document.querySelector(".js-arrow");
  // jsArrow.onclick = function () {
  //   navLinks.classList.toggle("show3");
  // };

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
      <div class="navbar">
        <i class="bx bx-menu"></i>
        <div class="logo">
          <Link className="text-link" style={{ textDecoration: "none" }} to="/">
            SHOP IT
          </Link>
        </div>
        <div class="nav-links">
          <div class="sidebar-logo">
            <Link to="/" class="logo-name text-link">
              SHOP IT
            </Link>
            <i class="bx bx-x"></i>
          </div>
          <ul class="links">
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
                  <a href="#">{user && user.userName}</a>
                  <i class="bx bxs-chevron-down js-arrow arrow"></i>
                  <ul class="js-sub-menu sub-menu">
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
        <div class="search-box"></div>
      </div>
    </nav>
  );
};

export default Navbar;
