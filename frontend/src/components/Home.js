import React, { useState, useEffect, useMemo } from "react";
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
  const [price, setPrice] = useState([100, 100000]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount, resultsPerPage } =
    useSelector((state) => state.products);
  let keyword = match.params.keyword;

  // const [search, setSearch] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <section className="section-products">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12 my-3">
                <Route
                  render={({ history }) => <SearchBar history={history} />}
                />
              </div>
              <div className="col-md-8 col-lg-6 justify-self-center">
                <div className="header">
                  <h3>Featured Product</h3>
                  <h2>Popular Products</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {/* if keyword exists display the filters */}
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          100: `Rs100`,
                          50000: `Rs50000`,
                        }}
                        min={100}
                        max={50000}
                        defaultValue={[100, 50000]}
                        tipFormatter={(value) => `Rs${value}`}
                        tipProps={{ placement: "top", visible: true }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>

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
                </>
              ) : (
                products &&
                products.map((product) => {
                  return <Card key={product._id} product={product} col={3} />;
                })
              )}
            </div>
          </div>

          {/* display pagination only if total products are less than or equal to products per page */}
          {resultsPerPage <= productCount && (
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
    </section>
  );
};

export default Home;
