import React, { useState, useEffect } from "react";
import { MetaData } from "../commons/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestion,
  getQuestionDetails,
  clearErrors,
} from "../../actions/questionActions";
import SideBar from "./SideBar";
import { UPDATE_QUESTION_RESET } from "../../constants/questionConstants";

import storeStyles from "../../styles/stores.module.css";

const UpdateStore = ({ history, match }) => {
  const [category, setCategory] = useState("");
  const [faqQuestion, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state.questionDetails);
  const { isUpdated, error } = useSelector((state) => state.manageQuestions);

  const QUESTION_ID = match.params.id;

  useEffect(() => {
    if (question && question._id !== QUESTION_ID) {
      dispatch(getQuestionDetails(QUESTION_ID));
    } else {
      setCategory(question.category);
      setQuestion(question.question);
      setAnswer(question.answer);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Question Updated Successfully");
      history.push("/admin/questions");
      dispatch({ type: UPDATE_QUESTION_RESET });
    }
  }, [question, isUpdated, error, alert, dispatch, QUESTION_ID, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateQuestion(question._id, { category, faqQuestion, answer }));
  };
  return (
    <>
      <MetaData title="Update Question" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="row wrapper mt-3">
          <div className="col-10 col-lg-5">
            <form
              onSubmit={submitHandler}
              className={storeStyles.new_store_form + " shadow-lg p-5"}
            >
              <h1 className="mt-2 mb-5">Update Question</h1>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <input
                  type="text"
                  id="category_field"
                  className={"form-control"}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="question_field">Question</label>
                <textarea
                  value={faqQuestion}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="form-control"
                  id="question_field"
                  rows="10"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="answer_field">Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="answer_field"
                  rows="15"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
              >
                Update Question
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateStore;
