import React from "react";
import { Link } from "react-router-dom";

import "../../styles/card.css";

const Card = ({ product, col }) => {
  return (
    <div className={`col-12 col-md-6 col-lg-${col} my-3 mb-4`}>
      <div className="card-container">
        <div className="card-part-1">
          <Link to={`/products/${product._id}`}>
            <img
              className="product-image"
              src={product.productImages[0].url}
              alt="product"
            />
          </Link>
          <div className="icons">
            <Link
              className="icon text-link"
              style={{ textDecoration: "none" }}
              to={`/products/${product._id}`}
            >
              <span>Details</span>
            </Link>
          </div>
        </div>
        <div className="card-part-2">
          <h2 className="product-name">{product.productName}</h2>
          <h3 className="product-price">
            Price: Rs. {product.productPriceMax}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
