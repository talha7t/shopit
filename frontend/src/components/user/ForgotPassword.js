import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import { forgotPassword, clearErrors } from "../../actions/userActions";

export const ForgotPassword = () => {
  const [userEmail, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(userEmail));
  };

  return (
    <>
      <MetaData title="Forgot Password" />

      <div className="container d-flex justify-content-center align-items-center update-profile-container">
        <form
          action="/me/update"
          onSubmit={submitHandler}
          className="profile-card w-50 p-3"
        >
          <h3 className="profile-heading mb-4">Forgot Password</h3>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userEmail">
              Email
            </label>
            <input
              name="userEmail"
              type="email"
              id="userEmail"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={userEmail}
              required
            />
          </div>
          <div className="form-group mt-5">
            <button
              type="submit"
              disabled={loading ? true : false}
              className="form-control btn btn-primary rounded update-profile-btn submit px-3 mb-2 d-flex align-items-center justify-content-center"
            >
              Get Reset Token
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
