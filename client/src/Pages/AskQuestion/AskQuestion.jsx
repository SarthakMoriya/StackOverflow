import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { askQuestion } from "../../actions/Question";

import "./AskQuestion.css";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  console.log(User);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User.user.name,
          userId:User.user._id
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask Public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="eg: How to center a div"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would require to answer your
                question
              </p>
              <textarea
                name=""
                onKeyPress={handleEnter}
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                id="ask-ques-body"
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Title</h4>
              <p>Add upto 5 tags to describe what your question is about</p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                id="ask-ques-tags"
                placeholder="eg: Html Css Js"
              />
            </label>
          </div>
          <button
            type="submit"
            value="Review your Question"
            className="review-btn"
          ></button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
