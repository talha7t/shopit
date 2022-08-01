import axios from "axios";

import {
  ALL_STORES_REQUEST,
  ALL_STORES_SUCCESS,
  ALL_STORES_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_DETAILS_FAIL,
  ADMIN_STORES_REQUEST,
  ADMIN_STORES_SUCCESS,
  ADMIN_STORES_FAIL,
  NEW_STORE_REQUEST,
  NEW_STORE_SUCCESS,
  NEW_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  CLEAR_ERRORS,
} from "../constants/storeConstants";

export const getStores = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_STORES_REQUEST,
    });
    const { data } = await axios.get(`/api/stores`);

    console.log(data);
    dispatch({
      type: ALL_STORES_SUCCESS,
      payload: data.stores,
    });
  } catch (error) {
    dispatch({
      type: ALL_STORES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get store details
export const getStoreDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STORE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/store/${id}`);
    dispatch({
      type: STORE_DETAILS_SUCCESS,
      payload: data.store,
    });
  } catch (error) {
    dispatch({
      type: STORE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin get all stores

export const adminGetStores = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_STORES_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/stores`);
    dispatch({
      type: ADMIN_STORES_SUCCESS,
      payload: data.stores,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STORES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin create store

export const createStore = (storeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_STORE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/store/new`,
      storeData,
      config
    );

    dispatch({
      type: NEW_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_STORE_FAIL, payload: error.response.data.message });
  }
};

// admin update a store
export const updateStore = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STORE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/store/${id}`,
      storeData,
      config
    );

    dispatch({
      type: UPDATE_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Admin delete store
export const deleteStore = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STORE_REQUEST });

    const { data } = await axios.delete(`/api/admin/store/${id}`);

    dispatch({
      type: DELETE_STORE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
