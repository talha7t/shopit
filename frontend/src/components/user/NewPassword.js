import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import { resetPassword, clearErrors } from "../../actions/userActions";

export const NewPassword = ({ history, match }) => {
  const [userPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      //   loadUser();
    }
    if (success) {
      alert.success("Password changed successfully");
      history.push("/login");
    }
  }, [error, alert, dispatch, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    // token is the password reset token, not authentication token
    dispatch(resetPassword(match.params.token, userPassword, confirmPassword));
  };

  return (
    <>
      <MetaData title="Reset Password" />

      <div className="container d-flex justify-content-center align-items-center update-profile-container">
        <form
          action="/me/update"
          onSubmit={submitHandler}
          className="profile-card w-50 p-3"
        >
          <h3 className="profile-heading mb-4">Reset Password</h3>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userPassword">
              Password
            </label>
            <input
              name="userPassword"
              type="password"
              id="userPassword"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={userPassword}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>

          <div className="form-group mt-5">
            <button
              type="submit"
              disabled={loading ? true : false}
              className="form-control btn btn-primary rounded update-profile-btn submit px-3 mb-2 d-flex align-items-center justify-content-center"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
