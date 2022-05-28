import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Card from "./commons/Card";
import { MetaData } from "./commons/MetaData";
import { getProducts } from "../actions/productsAction";
import Loader from "./commons/Loader";
import { useAlert } from "react-alert";
import "../styles/Home.css";
import debounce from "lodash.debounce";
import { SearchBar } from "./commons/SearchBar";
import { Route } from "react-router-dom";
import useDebounce from "../utilities.js/useDebounce";

const Home = ({ history, match }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount, resultsPerPage } =
    useSelector((state) => state.products);
  let keyword = match.params.keyword;

  const [search, setSearch] = useState(null);
  const debouncedSearch = useDebounce(search, 500);
  // const [searchTerm, setSearchTerm] = useState("");

  // const debouncedResults = useMemo(() => {
  //   const handleChange = (e) => {
  //     setSearchTerm(e.target.value);

  //     if (e.target.value === "") {
  //       history.push("/");
  //       // document.getElementById("search-field").value = e.target.value;
  //     } else {
  //       history.push(`/search/${searchTerm}`);
  //       document.getElementById("search-field").value = e.target.value;
  //     }
  //     // keyword = e.target.value;
  //     // dispatch(getProducts(e.target.value, currentPage));
  //   };

  //   return debounce(handleChange, 300);
  // }, [history, searchTerm]);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));

    // return () => {
    //   debouncedResults.cancel();
    // };
  }, [dispatch, alert, error, keyword, currentPage]);

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
              {products &&
                products.map((product) => {
                  return <Card key={product._id} product={product} />;
                })}
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
