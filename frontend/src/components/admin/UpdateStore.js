import React, { useState, useEffect } from "react";
import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStore,
  getStoreDetails,
  clearErrors,
} from "../../actions/storeActions";
import SideBar from "./SideBar";
import { UPDATE_STORE_RESET } from "../../constants/storeConstants";

import storeStyles from "../../styles/stores.module.css";

const UpdateStore = ({ history, match }) => {
  const [storeId, setId] = useState("");
  const [storeName, setName] = useState("");
  const [storeAddress, setAddress] = useState("");
  const [storeURL, setURL] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.storeDetails);
  const { isUpdated, error } = useSelector((state) => state.manageStore);

  const STORE_ID = match.params.id;

  useEffect(() => {
    if (store && store._id !== STORE_ID) {
      dispatch(getStoreDetails(STORE_ID));
    } else {
      setId(store.storeId);
      setName(store.storeName);
      setAddress(store.storeAddress);
      setURL(store.storeURL);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Store Updated Successfully");
      history.push("/admin/stores");
      dispatch({ type: UPDATE_STORE_RESET });
    }
  }, [store, isUpdated, error, alert, dispatch, STORE_ID, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateStore(store._id, { storeId, storeName, storeAddress, storeURL })
    );
  };
  return (
    <>
      <MetaData title="Update Store" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="row wrapper mt-3">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={submitHandler}
              className={storeStyles.new_store_form + " shadow-lg p-5"}
            >
              <h1 className="mt-2 mb-5">Update Store</h1>

              <div className="form-group">
                <label htmlFor="id_field">Store Id</label>
                <input
                  type="text"
                  id="id_field"
                  className="form-control"
                  name="id"
                  value={storeId}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name_field">Store Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={storeName}
                  onChange={(e) => setName(e.target.value)}
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
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update Store
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateStore;
