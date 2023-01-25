import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { askQuestion } from "../../actions/Question";

import "./AskQuestion.css";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);
  const [quesLeft, setQuesLeft] = useState(()=> { return localStorage.getItem("quesLeft") });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quesLeft <= 0) {
      alert(
        "Maximum number of questions already asked! \n Please Upgrade your plan"
      );
      navigate("/payment");
      return;
    }
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User.user.name,
          userId: User.user._id,
        },
        navigate
      )
    );
    //setQuesLeft(quesLeft - 1);
    localStorage.setItem("quesLeft",parseInt(quesLeft)-1);
    // localStorage.setItem("quesLeft", quesLeft);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("quesLeft", quesLeft);
  // }, [])
  
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask Public Question</h1>
        <h4>{User?.user?.noOfQuestions} Questions Left</h4>
        <h4>{quesLeft} Questions Left</h4>
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
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
