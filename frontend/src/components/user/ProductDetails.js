import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productsAction";
import { myOrders } from "../../actions/orderActions";
import { addItemToCart } from "../../actions/cartActions";
import Loader from "../commons/Loader";
import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../review/ListReviews";

import "../../styles/product-details.css";

export const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [imageUrl, setUrl] = useState("");
  const [selectedSize, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.myOrders);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const quantityRef = useRef();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, match.params.id, success, reviewError, alert]);

  const setImageUrl = (e) => {
    setUrl(e.target.src);
  };

  const getStock = (e) => {
    setSize(e.target.value);
    product.inventory.forEach((item) => {
      if (e.target.value === item.size) {
        if (item.productStock)
          document.getElementById("stock_status").textContent =
            item.productStock;
        setStock(item.productStock);
      } else {
        return "PLease select a size";
      }
    });
  };

  const shouldReview = () => {
    if (orders !== undefined && orders.length > 0) {
      let isOrdered = false;
      let results = orders
        .map((x) => x.orderItems)
        .flat()
        .map((y) => y.product);

      results.forEach((result) => {
        if (result === match.params.id) {
          isOrdered = true;
        }
      });

      return isOrdered ? (
        <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
          onClick={setUserRatings}
        >
          Submit Your Review
        </button>
      ) : (
        <div className="text-danger alert alert-danger mt-5">
          Purchase the product to review
        </div>
      );
    }
  };

  const decreaseQuantity = (e) => {
    if (selectedSize) {
      if (parseInt(quantityRef.current.value) > 1) {
        setQuantity(parseInt(quantityRef.current.value) - 1);
      }
      return;
    }
  };

  const increaseQuantity = (e) => {
    if (selectedSize) {
      if (parseInt(quantityRef.current.value) < stock) {
        setQuantity(parseInt(quantityRef.current.value) + 1);
      } else return;
    }
  };

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity, selectedSize));
    alert.success("item added to cart");
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");
            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = (e) => {
    // pattern for recognizing urls
    const pattern =
      /(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi;
    const url = pattern.test(comment);

    if (!url) {
      dispatch(newReview(match.params.id, rating, comment));
    } else {
      alert.error("urls can not be used in comments");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Product Details" />

          <div className="container container-fluid">
            <div className="row f-flex justify-content-around">
              <div
                className="col-12 col-lg-5 img-fluid align-self-start mb-5"
                id="product_image"
              >
                {product.productImages && (
                  <img
                    src={imageUrl || product.productImages[0].url}
                    alt="product"
                    height="500"
                    width="500"
                  />
                )}

                <div className="preview-images mt-4 d-flex align-items-center justify-content-center">
                  {product.productImages &&
                    product.productImages.map((product) => {
                      return (
                        <div
                          key={product.public_id}
                          className="preview-image-container ms-4"
                        >
                          <img
                            onClick={setImageUrl}
                            src={product.url}
                            alt="product"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.productName}</h3>
                <p id="product_id">Product # {product.productModel}</p>
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                <hr />

                <p id="product_price">Price: {product.productPriceMax}</p>

                <h6>
                  Type:
                  <span className="product-type"> {product.productType}</span>
                </h6>

                <hr />
                <h5>
                  Size:{" "}
                  <span className="size-text">
                    {selectedSize ? selectedSize : "Please select a size"}
                  </span>
                </h5>

                <ul className="sizes-radios-container d-flex flex-wrap  p-0">
                  {product.inventory &&
                    product.inventory.map((item) => {
                      return (
                        <li key={item.size} className="me-3">
                          <input
                            className={`mt-1 stock-radio ${item.size}-radio`}
                            type="radio"
                            name="size-radio"
                            value={item.size}
                            onClick={(e) => {
                              // setSize(item.size);
                              setQuantity(1);
                              getStock(e);
                            }}
                          />
                        </li>
                      );
                    })}
                </ul>

                <div className="stockCounter d-inline-flex align-items-center justify-content-center mt-4">
                  <span
                    onClick={decreaseQuantity}
                    className="minus d-inline-flex align-items-center"
                  >
                    <i className="fas fa-minus"></i>
                  </span>

                  <input
                    type="number"
                    className="count d-inline-block"
                    ref={quantityRef}
                    value={quantity}
                    readOnly
                  />

                  <span
                    onClick={increaseQuantity}
                    className="plus d-inline-flex align-items-center "
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  onClick={addToCart}
                  disabled={selectedSize ? false : true}
                  className="btn btn-primary add-to-cart_btn d-inline-block ms-4"
                >
                  Add to Cart
                </button>
                <p className="mt-3">
                  Availability:
                  <span id="stock_status">Please Select a Size</span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.productDescription}</p>
                <hr />

                {user ? (
                  shouldReview()
                ) : (
                  <div className="text-danger alert alert-danger mt-5">
                    Login to submit review
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars d-flex ps-0">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <div className="input-group">
                              <textarea
                                name="review"
                                id="review"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="form-control mt-3"
                              ></textarea>
                            </div>

                            <button
                              className="btn btn-primary my-3 float-right review-btn px-4 "
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={reviewHandler}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.productReviews && product.productReviews.length > 0 && (
            <ListReviews reviews={product.productReviews} />
          )}
        </>
      )}
    </>
  );
};
