import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomeMainbar.css";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList";

const HomeMainbar = () => {
  const questionsList = useSelector((state) => state.questionsReducer);
  const location = useLocation();
  const user = 1;

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <Link to={user === null ? "/auth" : "/askquestion"} className="ask-btn">
          Ask Question
        </Link>
      </div>
      <div className="question-main-container">
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
/*
 var questionList = [
    {
      _id: 1,
      upVotes:3,
      downVotes:4,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a Function ?",
      questionBody: "just tell me please...",
      questionTags: ["java", "c",'c++','javascript'],
      userPosted: "Sarthak",
      askedOn: "jan 1",
      answer:[{
        answerBody:'Answer',
        userAnswered:'Aarsh',
        answeredOn:'Jan 2',
        userId:2
      }]
    },
   
    {
      _id: 5,
      upVotes:3,
      downVotes:4,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a Function ?",
      questionBody: "just tell me please...",
      questionTags: ["java", "c",'c++','javascript'],
      userPosted: "Sarthak",
      askedOn: "jan 1",
      answer:[{
        answerBody:'Answer',
        userAnswered:'Aarsh',
        answeredOn:'Jan 2',
        userId:2
      }]
    },
   
    {
      _id: 2,
      upVotes:0,
      downVotes:4,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a Function ?",
      questionBody: "just tell me please...",
      questionTags: ["java", "c",'c++','javascript'],
      userPosted: "Sarthak",
      askedOn: "jan 1",
      answer:[{
        answerBody:'Answer',
        userAnswered:'Aarsh',
        answeredOn:'Jan 2',
        userId:2
      }]
    },
   
    {
      _id: 3,
      upVotes:3,
      downVotes:4,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a Function ?",
      questionBody: "just tell me please...",
      questionTags: ["java", "c",'c++','javascript'],
      userPosted: "Sarthak",
      askedOn: "jan 1",
      answer:[{
        answerBody:'Answer',
        userAnswered:'Aarsh',
        answeredOn:'Jan 2',
        userId:2
      }]
    },
   
    {
      _id: 4,
      upVotes:3,
      downVotes:4,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a Function ?",
      questionBody: "just tell me please...",
      questionTags: ["java", "c",'c++','javascript'],
      userPosted: "Sarthak",
      askedOn: "jan 1",
      answer:[{
        answerBody:'Answer',
        userAnswered:'Aarsh',
        answeredOn:'Jan 2',
        userId:2
      }]
    },
   
  ];
*/
