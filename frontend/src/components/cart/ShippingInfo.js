import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../actions/cartActions";
import { CheckoutSteps } from "./CheckoutSteps";
import { MetaData } from "../commons/MetaData";

export const ShippingInfo = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const countriesList = Object.values(countries);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.PhoneNo || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, country, city, postalCode, phoneNo }));
    history.push("/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Info" />

      {/* checkout steps */}
      <CheckoutSteps shipping />
      {/* shipping content */}
      <div className="row mx-0 wrapper justify-content-center align-content-center">
        <div className="col-10 col-lg-5 align-self-center">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                // value={phoneNo === "" ? phoneNo : parseInt(phoneNo)}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
