import React, { useState, useEffect } from "react";
import { MetaData } from "../commons/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import SideBar from "./SideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = ({ history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  //   const [userPassword, setPassword] = useState("");
  // const [userAddress, setAddress] = useState("");
  // const [userContact, setContact] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userDetails);
  const { isUpdated, error } = useSelector((state) => state.user);

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.userName);
      setEmail(user.userEmail);
      setRole(user.userRole);
      setStatus(user.userStatus);
      // setAddress(user.userAddress);
      // setContact(user.userContact);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [user, isUpdated, error, alert, dispatch, userId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(user._id, name, email, status, role));
  };
  return (
    <>
      <MetaData title="Update User" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="row wrapper mt-3">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>
                <select
                  id="role_field"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status_field">Status</label>
                <select
                  id="role_field"
                  className="form-control"
                  name="role"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="unblocked">unblock</option>
                  <option value="warned">Warn</option>
                  <option value="Blocked">Block</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateUser;
