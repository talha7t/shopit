import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import "../../styles/profile-password.css";

export const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isUpdated, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");

      // redirect to profile page
      history.push("/me");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [isUpdated, error, alert, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updatePassword(oldPassword, newPassword));
  };

  return (
    <>
      <MetaData title="Change Password" />

      <div className="container d-flex justify-content-center align-items-center update-profile-container">
        <form
          action="/me/update"
          onSubmit={submitHandler}
          className="profile-card w-50 p-3"
        >
          <h3 className="profile-heading mb-4">Update Password</h3>
          <div className="form-group mb-3">
            <label className="label" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              id="oldPassword"
              className="form-control"
              placeholder="Enter Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="newPassword">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Enter Old Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
            <div className="form-group mt-5">
              <button
                type="submit"
                disabled={loading ? true : false}
                className="form-control btn btn-primary rounded update-profile-btn submit px-3 mb-2 d-flex align-items-center justify-content-center"
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
