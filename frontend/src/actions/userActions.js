import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

// Login User
export const login = (userEmail, userPassword) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const { data } = await axios.post(
      "/api/login",
      { userEmail, userPassword },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register User
export const register =
  (userName, userEmail, userPassword, userAddress, userContact) =>
  async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const { data } = await axios.post(
        "/api/register",
        { userName, userEmail, userPassword, userAddress, userContact },
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      error: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfile =
  (userName, userEmail, userPassword, userAddress, userContact) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const { data } = await axios.put(
        "/api/me/update",
        { userName, userEmail, userPassword, userAddress, userContact },
        config
      );

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
