import React, { useState, useEffect } from "react";

import { MetaData } from "../commons/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import "../../styles/profile-password.css";

export const UpdateProfile = ({ history }) => {
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  //   const [userPassword, setPassword] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userContact, setContact] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setName(user.userName);
      setEmail(user.userEmail);
      setAddress(user.userAddress);
      setContact(user.userContact);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      // redirect to profile page
      history.push("/me");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [user, isUpdated, error, alert, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile(userName, userEmail, userAddress, userContact));
  };

  return (
    <>
      <MetaData title="Update Profile" />

      <div className="container d-flex justify-content-center align-items-center update-profile-container">
        <form
          action="/me/update"
          onSubmit={submitHandler}
          className="profile-card w-50 p-3"
        >
          <h3 className="profile-heading mb-4">Update Profile</h3>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userName">
              Username
            </label>
            <input
              name="userName"
              type="text"
              id="userName"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              value={userName}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userEmail">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="userEmail"
              id="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userAddress">
              Address
            </label>
            <input
              type="text"
              name="userAddress"
              className="form-control"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={userAddress}
              id="userAddress"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="userContact">
              Contact Number
            </label>
            <input
              type="tel"
              name="userContact"
              className="form-control"
              placeholder="e.g. +923034255227"
              id="userContact"
              value={userContact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              disabled={loading ? true : false}
              className="form-control btn btn-primary rounded update-profile-btn submit px-3 mb-2 d-flex align-items-center justify-content-center"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
