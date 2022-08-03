import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import SideBar from "./SideBar";
import { createStore, clearErrors } from "../../actions/storeActions";
import { NEW_STORE_RESET } from "../../constants/storeConstants";

import storeStyles from "../../styles/stores.module.css";

const NewStore = ({ history }) => {
  const [storeId, setId] = useState("");
  const [storeName, setName] = useState("");
  const [storeAddress, setAddress] = useState("");
  const [storeURL, setURL] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newStore);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (success) {
      history.push("/admin/stores");
      alert.success("Store addedd successfully");
      dispatch({ type: NEW_STORE_RESET });
    }
  }, [alert, error, history, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createStore({ storeId, storeName, storeAddress, storeURL }));
  };

  return (
    <>
      <MetaData title="Create Product" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex p-0">
          <h1 className="text admin-main-heading">New Store</h1>
        </div>

        <div className="wrapper container my-5">
          <form
            onSubmit={submitHandler}
            className={storeStyles.new_store_form + " shadow-lg p-5"}
          >
            <h1 className="mb-4">New Store</h1>

            <div className="form-group">
              <label htmlFor="id_field">Store ID</label>
              <input
                type="text"
                id="id_field"
                className={"form-control"}
                value={storeId}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="model_field">Store Name</label>
              <input
                type="text"
                id="name_field"
                className={"form-control"}
                value={storeName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_field">Store Address</label>
              <textarea
                value={storeAddress}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="address_field"
                rows="10"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="url_field">Embed URL</label>
              <textarea
                value={storeURL}
                onChange={(e) => setURL(e.target.value)}
                className="form-control"
                id="url_field"
                rows="15"
                required
              ></textarea>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3 w-100"
              disabled={loading ? true : false}
            >
              Add Store
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewStore;
