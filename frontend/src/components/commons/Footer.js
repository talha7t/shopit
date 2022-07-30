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
                <Link to="/about">about us</Link>
              </li>
              <li>
                <a href="/">our services</a>
              </li>
              <li>
                <a href="/">privacy policy</a>
              </li>
              <li>
                <a href="/">affiliate program</a>
              </li>
            </ul>
          </div>
          <div className={footerStyles.footer_col}>
            <h4>get help</h4>
            <ul>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">shipping</a>
              </li>
              <li>
                <a href="/">returns</a>
              </li>
              <li>
                <Link to="/orders/me">order status</Link>
              </li>
              <li>
                <a href="/">payment options</a>
              </li>
            </ul>
          </div>
          <div className={footerStyles.footer_col}>
            <h4>follow us</h4>
            <div className={footerStyles.social_links}>
              <a href="/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
