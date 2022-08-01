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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27223.27355577722!2d74.34258811562498!3d31.471683999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919070f54a777a1%3A0xb4da92e704b1fd7!2sIdeas%20By%20Gul%20Ahmed!5e0!3m2!1sen!2s!4v1659351887878!5m2!1sen!2s"
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
