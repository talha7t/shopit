import React, { useState, useEffect } from "react";
import Loader from "./commons/Loader";
import { MetaData } from "./commons/MetaData";
import { contactUs, clearErrors } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "../styles/contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [userMessage, setMessage] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(contactUs(name, email, subject, userMessage));
  };

  return (
    <>
      <MetaData title="Contact Us" />
      <div className="container-fluid">
        <div className="contact-form-wrapper d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="contact-form">
            <h5 className="title">Contact us</h5>
            <p className="description">
              Feel free to contact us if you need any assistance, any help or
              another question.
            </p>
            <div>
              <input
                type="text"
                className="form-control rounded border-white mb-3 form-input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="form-control rounded border-white mb-3 form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control rounded border-white mb-3 form-input"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                id="userMessage"
                className="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder="Message"
                value={userMessage}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="submit-button-wrapper">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
