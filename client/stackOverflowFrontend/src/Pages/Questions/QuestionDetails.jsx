import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import voteUp from "../../assets/sort-up.svg";
import voteDown from "../../assets/sort-down.svg";
import Avatar from "../../components/Avatar/Avatar";

import DisplayAnswers from "./DisplayAnswers";
import { postAnswer ,deleteQuestion,voteQuestion} from "../../actions/Question";

import "./Question.css";

const QuetionDetails = () => {
  const { id } = useParams();
  const questionList = useSelector((state) => state.questionsReducer);
  const [answer, setAnswer] = useState("");
  const User = useSelector((state) => state.currentUserReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "http://localhost:3000/";

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();

    if (User === null) {
      alert("Pleasae Login or Signup to answer a question");
      navigate("/auth");
    } else {
      if (answer === "") {
        alert("Please enter a answer before submitting!");
      } else {
      }
      dispatch(
        postAnswer({
          id,
          noOfAnswers: answerLength + 1,
          answerBody: answer,
          userAnswered: User.user.name,
          userId:User.user._id
        })
      );
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("link copied! " + url + location.pathname);
  };

  const handleDelete=()=>{
    dispatch(deleteQuestion(id,navigate))
  }

  const handleUpVote = () => {
    dispatch(voteQuestion(id,'upvote',User.user._id))
  }
  const handleDownVote = () => {
    dispatch(voteQuestion(id,'downvote',User.user._id))
  }

  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={voteUp}
                        alt="vote+"
                        width="18"
                        onClick={handleUpVote}
                        className="votes-icon"
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={voteDown}
                        onClick={handleDownVote}
                        alt="vote-"
                        width="18"
                        className="votes-icon"
                      />
                    </div>
                    <div className="" style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div className="">
                          <button onClick={handleShare}>Share</button>
                          {User?.user?._id === question?.userId && (
                            <button onClick={handleDelete}>Delete</button>
                          )}
                        </div>
                        <div className="">
                          <p>AskedOn {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/users/${question.userId}`}
                            className="user-link"
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {question.userPosted[0]}
                            </Avatar>
                            <div className="">{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} answers</h3>
                    <DisplayAnswers key={question._id} question={question} />
                  </section>
                )}
                <div className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question Tags
                    {question.questionTags.map((tag) => (
                      <Link to="/tags" key={tag} className="ans-tags">
                        {tag}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/askquestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      Ask Question
                    </Link>
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuetionDetails;

//   {
//     _id: 1,
//     upVotes: 3,
//     userId: 4,
//     downVotes: 4,
//     votes: 3,
//     noOfAnswers: 2,
//     questionTitle: "What is a Function ?",
//     questionBody: "just tell me please...",
//     questionTags: ["java", "c", "c++", "javascript"],
//     userPosted: "Sarthak",
//     askedOn: "jan 1",
//     answer: [
//       {
//         answerBody: "Answer",
//         userAnswered: "Aarsh",
//         answeredOn: "Jan 2",
//         userId: 2,
//       },
//     ],
//   },

//   {
//     _id: 5,
//     upVotes: 3,
//     userId: 4,
//     downVotes: 4,
//     votes: 3,
//     noOfAnswers: 2,
//     questionTitle: "What is a Function ?",
//     questionBody: "just tell me please...",
//     questionTags: ["java", "c", "c++", "javascript"],
//     userPosted: "Sarthak",
//     askedOn: "jan 1",
//     answer: [
//       {
//         answerBody: "Answer",
//         userAnswered: "Aarsh",
//         answeredOn: "Jan 2",
//         userId: 2,
//       },
//     ],
//   },

//   {
//     _id: 2,
//     userId: 4,
//     upVotes: 0,
//     downVotes: 4,
//     votes: 3,
//     noOfAnswers: 2,
//     questionTitle: "What is a Function ?",
//     questionBody: "just tell me please...",
//     questionTags: ["java", "c", "c++", "javascript"],
//     userPosted: "Sarthak",
//     askedOn: "jan 1",
//     answer: [
//       {
//         answerBody: "Answer",
//         userAnswered: "Aarsh",
//         answeredOn: "Jan 2",
//         userId: 2,
//       },
//     ],
//   },

//   {
//     _id: 3,
//     userId: 4,
//     upVotes: 3,
//     downVotes: 4,
//     votes: 3,
//     noOfAnswers: 2,
//     questionTitle: "What is a Function ?",
//     questionBody: "just tell me please...",
//     questionTags: ["java", "c", "c++", "javascript"],
//     userPosted: "Sarthak",
//     askedOn: "jan 1",
//     answer: [
//       {
//         answerBody: "Answer",
//         userAnswered: "Aarsh",
//         answeredOn: "Jan 2",
//         userId: 2,
//       },
//     ],
//   },

//   {
//     _id: 4,
//     userId: 4,
//     upVotes: 3,
//     downVotes: 4,
//     votes: 3,
//     noOfAnswers: 2,
//     questionTitle: "What is a Function ?",
//     questionBody: "just tell me please...",
//     questionTags: ["java", "c", "c++", "javascript"],
//     userPosted: "Sarthak",
//     askedOn: "jan 1",
//     answer: [
//       {
//         answerBody: "Answer",
//         userAnswered: "Aarsh",
//         answeredOn: "Jan 2",
//         userId: 2,
//       },
//     ],
//   },
// ];
