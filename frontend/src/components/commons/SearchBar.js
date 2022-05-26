import React, { useState } from "react";

export const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  // const handleChange = (e) => {};

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search-field"
          className="form-control"
          placeholder="Product Name"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn" id="search-btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
