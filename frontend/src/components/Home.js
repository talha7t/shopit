import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Card from "./commons/Card";
import Slider from "rc-slider";
import { MetaData } from "./commons/MetaData";
import { getProducts } from "../actions/productsAction";
import Loader from "./commons/Loader";
import { useAlert } from "react-alert";
import { SearchBar } from "./commons/SearchBar";
import { Route } from "react-router-dom";

import "../styles/Home.css";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ history, match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 20000]);
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const genders = ["men", "women", "kids"];

  const categories = [
    "Kurta",
    "Kurta Shalwar",
    "Prince Coats",
    "Waistcoats",
    "Sherwani",
    "Bottoms",
    "Denim",
    "Night suit",
    "T-Shirt",
    "Shirt",
    "Gowns",
    "1 Piece",
    "2 Piece",
    "3 Piece",
    "Sweat Shirts",
    "Hoodies",
    "Pyjamas",
    "Shoulder Bags",
    "Mini Bags",
    "Backpacks",
    "Sneakers",
    "Heals",
    "Flat",
    "Slippers",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(
      getProducts(keyword, currentPage, price, category, gender, rating)
    );
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    price,
    gender,
    category,
    rating,
  ]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productCount;

  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <section className="section-products">
      <div className="container">
        {/* -------Search Bar -------- */}
        <div className="row justify-content-center text-center">
          <div className="col-12 my-3">
            <Route render={({ history }) => <SearchBar history={history} />} />
          </div>
        </div>

        <MetaData title={"Home"} />

        <div className="row mt-5">
          {/* if keyword exists display the filters */}
          {/* {keyword ? ( */}
          <>
            <div className="col-6 col-md-3 mt-5 mb-5">
              <div className="px-5">
                <Range
                  marks={{
                    0: `Rs0`,
                    20000: `Rs20000`,
                  }}
                  min={0}
                  max={20000}
                  defaultValue={[0, 20000]}
                  tipFormatter={(value) => `Rs${value}`}
                  tipProps={{ placement: "top", visible: true }}
                  value={price}
                  step={2000}
                  included={true}
                  dots={true}
                  onChange={(price) => setPrice(price)}
                />

                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">For</h4>
                  <ul className="ps-0">
                    {genders.map((gender) => (
                      <li
                        key={gender}
                        onClick={() => setGender(gender)}
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                          textTransform: "capitalize",
                        }}
                      >
                        {gender}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-5" />
                <div className="mt-5">
                  <h4 className="mb-3">Categories</h4>
                  <ul className="ps-0">
                    {categories.map((category) => (
                      <li
                        key={category}
                        onClick={() => setCategory(category)}
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-3" />
                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="ps-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : filteredProductsCount <= 0 ? (
              <div className="col mt-5 mb-5">
                <h3 style={{ color: "#333" }}>
                  No Products Found with selected Filters or Search Term
                </h3>
              </div>
            ) : (
              <>
                <div className="col-6 col-md-9">
                  <div className="row">
                    {products &&
                      products.map((product) => {
                        return (
                          <Card key={product._id} product={product} col={4} />
                        );
                      })}
                  </div>
                </div>

                {/* display pagination only if total products are less than or equal to products per page */}
                {resultsPerPage <= count && (
                  <div class="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultsPerPage}
                      totalItemsCount={productCount}
                      onChange={setCurrentPageNumber}
                      pageRangeDisplayed={5}
                      nextPageText={"Next"}
                      prevPageText={"Prev"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default Home;
