import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MetaData } from "./../commons/MetaData";
import Loader from "./../commons/Loader";

import "../../styles/profile.css";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const rowClasses = "row details-row mb-5";
  const fixedContentClasses = "col-5 col-md-4 col-lg-3 d-flex align-items-end ";
  const userInfomrationClasses =
    "col-5 col-md-8 col-lg-9 d-flex align-items-end justify-content-start";

  return (
    <div className="container my-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Profile" />
          <div className="d-flex justify-content-center mb-5">
            <h2 className="main-heading">Profile Details</h2>
          </div>

          <div className={rowClasses}>
            <div className={fixedContentClasses}>
              <h2 className="user-heading">User Name</h2>
            </div>
            <div className={userInfomrationClasses}>
              <p className="user-info">{user.userName}</p>
            </div>
          </div>

          <div className={rowClasses}>
            <div className={fixedContentClasses}>
              <h2 className="user-heading">Email</h2>
            </div>
            <div className={userInfomrationClasses}>
              <p className="user-info">{user.userEmail}</p>
            </div>
          </div>

          <div className={rowClasses}>
            <div className={fixedContentClasses}>
              <h2 className="user-heading">Address</h2>
            </div>
            <div className={userInfomrationClasses}>
              <p className="user-info">{user.userAddress}</p>
            </div>
          </div>

          <div className={rowClasses}>
            <div className={fixedContentClasses}>
              <h2 className="user-heading">Contact</h2>
            </div>
            <div className={userInfomrationClasses}>
              <p className="user-info">{user.userContact}</p>
            </div>
          </div>

          <div className="row my-5 buttons-container">
            <div className="col-5 col-md-4">
              <Link
                to="/password/update"
                className="btn btn-primary text-success"
                id="password-btn"
              >
                Change Password
              </Link>
            </div>
            <div className="col-5 col-md-4 d-flex justify-content-start">
              <Link
                to="/update/me"
                className="btn btn-primary text-success"
                id="edit-btn"
              >
                Edit Information
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
