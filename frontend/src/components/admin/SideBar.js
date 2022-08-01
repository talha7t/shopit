import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import "../../styles/sidebar.css";

const body = document.querySelector("body");

const handleModeSwitch = () => {
  body.classList.toggle("dark");
  let modeText = document.querySelector(".mode-text");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
};

const SideBar = () => {
  const sidebar = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logoutUser());

    alert.success("Logged out successfully");
  };
  return (
    <>
      <nav ref={sidebar} className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">{/* <img src="logo.png" alt=""> */}</span>

            <div className="text logo-text">
              <Link to="/" className="text-link name">
                SHOP IT
              </Link>
              {/* <span className="profession">Web developer</span>  */}
            </div>
          </div>

          <i
            onClick={(e) => sidebar.current.classList.toggle("close")}
            className="bx bx-chevron-right toggle"
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link sidenav-link">
                <Link to="/dashboard">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link sidenav-link">
                <Link to="/admin/products">
                  <i className="bx bx-purchase-tag icon"></i>
                  <span className="text nav-text">Products</span>
                </Link>
              </li>

              <li className="nav-link sidenav-link">
                <Link to="/admin/orders">
                  <i className="bx bx-cart icon"></i>
                  <span className="text nav-text">Orders</span>
                </Link>
              </li>

              <li className="nav-link sidenav-link">
                <Link to="/admin/users">
                  <i className="bx bx-group icon"></i>
                  <span className="text nav-text">Users</span>
                </Link>
              </li>

              <li className="nav-link sidenav-link">
                <Link to="/admin/stores">
                  <i className="bx bx-store-alt icon"></i>
                  <span className="text nav-text">Stores</span>
                </Link>
              </li>

              <li className="nav-link sidenav-link">
                <Link to="/admin/questions">
                  <i class="far fa-question-circle icon"></i>
                  <span className="text nav-text">Questions</span>
                </Link>
              </li>
            </ul>

            {/* donot remove this  */}
            <li className="search-box"></li>
          </div>

          <div className="bottom-content">
            <li className="">
              <Link onClick={logoutHandler} to="/">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div onClick={handleModeSwitch} className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
