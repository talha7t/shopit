import React from "react";
import { Link } from "react-router-dom";

import "../../styles/card.css";

function Card({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 my-3 mb-4">
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
            <a className="icon" href={`/`}>
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a className="icon" href="/">
              <i className="fas fa-heart"></i>
            </a>
            <Link className="icon" to={`/products/${product._id}`}>
              <span>Details</span>
            </Link>
          </div>
        </div>
        <div className="card-part-2">
          <h2 className="product-name">{product.productName}</h2>
          <h3 className="product-price">
            Price: {product.productPriceMax} (Pkr)
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
