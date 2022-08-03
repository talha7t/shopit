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
  NEW_QUESTION_RESET,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_RESET,
  UPDATE_QUESTION_FAIL,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_RESET,
  DELETE_QUESTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/questionConstants";

export const questionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case ALL_QUESTIONS_REQUEST:
    case ADMIN_QUESTIONS_REQUEST:
      return {
        loading: true,
        questions: [],
      };
    case ALL_QUESTIONS_SUCCESS:
    case ADMIN_QUESTIONS_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case ALL_QUESTIONS_FAIL:
    case ADMIN_QUESTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const questionDetailsReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case QUESTION_DETAILS_SUCCESS:
      return {
        loading: false,
        question: action.payload,
      };
    case QUESTION_DETAILS_FAIL:
      return { ...state, error: null };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const newQuestionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case NEW_QUESTION_REQUEST:
      return { ...state, loading: true };
    case NEW_QUESTION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        question: action.payload.question,
      };
    case NEW_QUESTION_FAIL:
      return { ...state, error: action.payload };
    case NEW_QUESTION_RESET:
      return { ...state, success: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const manageQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_QUESTION_REQUEST:
    case UPDATE_QUESTION_REQUEST:
      return { ...state, loading: true };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_QUESTION_FAIL:
    case UPDATE_QUESTION_FAIL:
      return { ...state, error: action.payload };
    case DELETE_QUESTION_RESET:
      return { ...state, isDeleted: false };
    case UPDATE_QUESTION_RESET:
      return { ...state, isUpdated: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
