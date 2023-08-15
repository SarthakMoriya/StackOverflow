import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionsList }) => {
  const latestQuestions = [...questionsList].reverse();
  console.log(latestQuestions);
  console.log(questionsList);
  return (
    <>
      {latestQuestions.map((question) => {
        // console.log(question);
        return <Questions question={question} key={question._id} />;
      })}
    </>
  );
};

export default QuestionList;
