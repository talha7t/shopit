import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import SideBar from "./SideBar";
import { createQuestion, clearErrors } from "../../actions/questionActions";
import { NEW_QUESTION_RESET } from "../../constants/questionConstants";

import storeStyles from "../../styles/stores.module.css";

const NewQuestion = ({ history }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newQuestion);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (success) {
      history.push("/admin/questions");
      alert.success("Questions addedd successfully");
      dispatch({ type: NEW_QUESTION_RESET });
    }
  }, [alert, error, history, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createQuestion({ category, question, answer }));
  };

  return (
    <>
      <MetaData title="Create Question" />

      <SideBar />
      <section className="admin-main-section py-3">
        <div className="text d-flex p-0">
          <h1 className="text admin-main-heading">New Question</h1>
        </div>

        <div className="wrapper container my-5">
          <form
            onSubmit={submitHandler}
            className={storeStyles.new_store_form + " shadow-lg p-5"}
          >
            <h1 className="mb-4">New Question</h1>

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
                value={question}
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
              id="login_button"
              type="submit"
              className="btn btn-block py-3 w-100"
              disabled={loading ? true : false}
            >
              Add Question
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewQuestion;
