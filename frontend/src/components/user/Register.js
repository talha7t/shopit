import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../commons/Loader";
import { MetaData } from "../commons/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

import "../../styles/login-register.css";

export const Register = ({ history }) => {
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userAddress, setAddress] = useState("");
  const [userContact, setContact] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, error, alert, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register(userName, userEmail, userPassword, userAddress, userContact)
    );
  };
  return (
    // if the page is aoding then display the loader
    <>
      {loading ? (
        <Loader />
      ) : (
        // if not loading, then display the login page
        <div>
          <MetaData title={"register"} />

          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center mb-5">
                  <h2 className="heading-section">Register</h2>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="wrap d-md-flex">
                    <div className="img"></div>
                    <div className="login-wrap p-4 p-md-5">
                      <div className="d-flex">
                        <div className="w-100">
                          <h3 className="mb-4">Register</h3>
                        </div>
                      </div>
                      <form
                        action="/register"
                        onSubmit={submitHandler}
                        className="signin-form"
                      >
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
                            // onChange={onChange}
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
                          <label className="label" htmlFor="userPassword">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={userPassword}
                            name="userPassword"
                            onChange={(e) => setPassword(e.target.value)}
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
                            className="form-control btn btn-primary rounded submit px-3 mb-2"
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                      <div className="w-100 text-center mt-2">
                        Already a member?
                        <Link to="/Login" data-toggle="tab">
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
