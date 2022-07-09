import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";

import "../../styles/profile.css";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="container my-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Profile" />
          <div class="container mt-5 details-container">
            <div class="info-separate my-4 pt-4">
              <h2 class="heading mb-3">Personal Details</h2>
              <p class="info">{user.userName}</p>
              <p class="info">{user.userDateOfBirth.substr(0, 10)}</p>
              <p class="info">{user.userGender}</p>
            </div>

            <div class="info-separate my-4 pt-4">
              <h2 class="heading mb-3">Login Details</h2>
              <p class="info email-text">{user.userEmail}</p>

              <Link to="/password/update">
                <button class="account-forgot-btn mt-3 p-2">
                  Change Password
                </button>
              </Link>
            </div>

            <div class="info-separate my-4 pt-4">
              <h2 class="heading mb-3">Address Details</h2>
              <p class="info">{user.userAddress}</p>
              <p class="info">
                {user.userCity}, {user.userZipCode}
              </p>
              <p class="info">{user.userCountry}</p>
              <p class="info">{user.userContact}</p>
            </div>

            <div class="info-separate my-4 py-4">
              <h2 class="heading mb-3">Manage Account</h2>
              <Link to="/update/me">
                <button class="w-25 account-manage-btn my-2 mb-3 py-2 px-4">
                  Edit Details
                </button>
              </Link>
              <br />
              <button class="w-25 account-manage-btn my-2 py-2 px-4">
                Delete Account
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
