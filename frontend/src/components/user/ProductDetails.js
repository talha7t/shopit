import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productsAction";
import Loader from "../commons/Loader";
import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";
import "../../styles/product-details.css";

export const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const quantityRef = useRef();

  const [imageUrl, setUrl] = useState("");

  const [selectedSize, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, match.params.id, alert]);

  const setImageUrl = (e) => {
    setUrl(e.target.src);
  };

  const getStock = () => {
    if (selectedSize) {
      product.inventory.map((item) => {
        return selectedSize === item.size
          ? setStock(item.productStock)
          : "Please Select a size";
      });
    }
  };

  const decreaseStock = (e) => {
    if (selectedSize) {
      if (parseInt(quantityRef.current.value) > 1) {
        setQuantity(parseInt(quantityRef.current.value) - 1);
      }
      return;
    }
  };

  const increaseStock = (e) => {
    if (selectedSize) {
      // console.log(typeof );
      if (parseInt(quantityRef.current.value) < stock) {
        setQuantity(parseInt(quantityRef.current.value) + 1);
      } else return;
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
                className="col-12 col-lg-5 img-fluid align-self-start"
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
                            onClick={() => {
                              setSize(item.size);
                              setQuantity(1);
                              getStock();
                            }}
                          />
                        </li>
                      );
                    })}
                </ul>

                <div className="stockCounter d-inline-flex align-items-center justify-content-center mt-4">
                  <span
                    onClick={decreaseStock}
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
                    onClick={increaseStock}
                    className="plus d-inline-flex align-items-center "
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary add-to-cart_btn d-inline-block ms-4"
                >
                  Add to Cart
                </button>

                <p className="mt-3">
                  Availability:
                  <span id="stock_status">
                    {stock ? stock : "Please select a size"}
                    {/* {getStock} */}
                    {/* {selectedSize
                      ? product.inventory.map((item) =>
                          item.size === selectedSize ? item.productStock : ""
                        )
                      : "Please Select a size"} */}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.productDescription}</p>
                <hr />

                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"
                >
                  Submit Your Review
                </button>

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
                            <ul className="stars d-flex">
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

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 "
                              data-bs-dismiss="modal"
                              aria-label="Close"
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
        </>
      )}
    </>
  );
};
