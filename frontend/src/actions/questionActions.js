import axios from "axios";

import {
  ALL_QUESTIONS_REQUEST,
  ALL_QUESTIONS_SUCCESS,
  ALL_QUESTIONS_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  ADMIN_QUESTIONS_REQUEST,
  ADMIN_QUESTIONS_SUCCESS,
  ADMIN_QUESTIONS_FAIL,
  NEW_QUESTION_REQUEST,
  NEW_QUESTION_SUCCESS,
  NEW_QUESTION_FAIL,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";

// user get all questions
export const getStores = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_QUESTIONS_REQUEST,
    });
    const { data } = await axios.get(`/api/questions`);

    dispatch({
      type: ALL_QUESTIONS_SUCCESS,
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: ALL_QUESTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin get question details
export const getQuestionDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: QUESTION_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/question/${id}`);
    dispatch({
      type: QUESTION_DETAILS_SUCCESS,
      payload: data.question,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin get all questions

export const adminGetQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_QUESTIONS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/questions`);
    dispatch({
      type: ADMIN_QUESTIONS_SUCCESS,
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_QUESTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin create question

export const createQuestion = (questionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUESTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/admin/question/new`,
      questionData,
      config
    );

    dispatch({
      type: NEW_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: NEW_QUESTION_FAIL, payload: error.response.data.message });
  }
};

// admin update a question
export const updateStore = (id, questionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUESTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/question/${id}`,
      questionData,
      config
    );

    dispatch({
      type: UPDATE_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Admin delete question
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: DELETE_QUESTION_REQUEST });

    const { data } = await axios.delete(`/api/admin/question/${id}`);

    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
