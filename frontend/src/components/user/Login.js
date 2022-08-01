import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";
import { login, clearErrors } from "../../actions/userActions";

import "../../styles/login-register.css";

export const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      // history.push("/");
      history.push(redirect);
    }
    if (error) {
      if (error === "You must be logged in to use this feature") {
        return;
      }
      alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    // if the page is aoding then display the loader
    <>
      {loading ? (
        <Loader />
      ) : (
        // if not loading, then display the login page
        <div>
          <MetaData title={"login"} />

          <section className="ftco-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                  <div className="wrap d-md-flex">
                    <div className="img"></div>
                    <div className="login-wrap p-4 p-md-5">
                      <div className="d-flex">
                        <div className="w-100">
                          <h3 className="mb-4">Login</h3>
                        </div>
                      </div>
                      <form
                        action="/login"
                        onSubmit={submitHandler}
                        className="signin-form"
                      >
                        <div className="form-group mb-3">
                          <label className="label" htmlFor="userEmail">
                            Email
                          </label>
                          <input
                            autoFocus
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="form-control btn btn-primary rounded submit px-3 mb-2"
                          >
                            Sign In
                          </button>
                        </div>
                      </form>

                      <div className="w-100 text-center mt-2">
                        <Link to="/password/forgot">Forgot Password</Link>
                      </div>
                      <div className="w-100 text-center mt-2">
                        Not a member?
                        <Link to="/register" className="ms-1" data-toggle="tab">
                          Sign Up
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
