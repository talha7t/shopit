import React from "react";
import { Link } from "react-router-dom";

import footerStyles from "../../styles/footer.module.css";

const footer = () => {
  return (
    <footer className={footerStyles.footer + " mt-5"}>
      <div className={footerStyles.container}>
        <div className={footerStyles.row}>
          <div className={footerStyles.footer_col}>
            <h4>company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/stores">Store Locator</Link>
              </li>
              <li>
                <Link to="/privacy">privacy policy</Link>
              </li>
            </ul>
          </div>

          <div className={footerStyles.footer_col}>
            <h4>My Account</h4>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/orders/me">Order History</Link>
              </li>
              <li>
                <Link to="/me">Account Details</Link>
              </li>
            </ul>
          </div>

          <div className={footerStyles.footer_col}>
            <h4>get help</h4>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping-policy">Shipping</Link>
              </li>

              <li>
                <Link to="/orders/me">Order Status</Link>
              </li>
            </ul>
          </div>
          <div className={footerStyles.footer_col}>
            <h4>Follow us</h4>
            <div className={footerStyles.social_links}>
              <Link to="/">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="/">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
