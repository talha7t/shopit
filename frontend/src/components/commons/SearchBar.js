import React, { useState } from "react";

export const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("")

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
        <select className="category-select" aria-label=".form-select-lg example">
          <option value="" onClick={e => setCategory(e.target.value)}>
            All Categories
          </option>
          {categories.map((category) => (
            <option value={category} key={category} onClick={e => setCategory(e.target.value)}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="search-field"
          className="form-control"
          placeholder="Product Name"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append" id="search-btn-container">
          <button className="btn" id="search-btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
