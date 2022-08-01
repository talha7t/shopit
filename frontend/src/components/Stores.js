import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStores, clearErrors } from "../actions/storeActions";
import { useAlert } from "react-alert";
import { MetaData } from "./commons/MetaData";
import Loader from "./commons/Loader";

import storeStyles from "../styles/stores.module.css";

const Stores = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const urlRef = useRef("");

  const { loading, error, stores } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const handleURL = (e) => {
    urlRef.current.src = e.target.dataset.url;
  };

  return (
    <>
      <MetaData title="All Stores" />
      <div className="container ms-3 mt-5">
        <div className="row">
          <h3 className="pb-4">STORE LOCATOR</h3>
          <div className="col-lg-3 order-lg-1 order-2">
            <div
              className={storeStyles.store_div + " border px-3 py-2 "}
              id={storeStyles.style_1}
            >
              {stores &&
                stores.map((store) => (
                  <div
                    key={store._id}
                    className={storeStyles.store + " border-bottom py-2"}
                  >
                    <>
                      <h6>{store.storeName}</h6>
                      <p data-url={store.storeURL} onClick={handleURL}>
                        {store.storeAddress}
                      </p>
                    </>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-lg-9 order-lg-2 order-1 pb-lg-0 pb-4">
            <div>
              <iframe
                src={stores && stores[0]}
                className={storeStyles.get_map + " border-0"}
                title="map"
                allowFullScreen=""
                ref={urlRef}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stores;
