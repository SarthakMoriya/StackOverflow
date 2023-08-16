import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

const Questions = ({ question }) => {
  return (
    <div className="display-question-container">
      <div className="display-votes-ans">
        <p>{question.upVote.length-question.downVote.length}</p>
        <p>Votes</p>
      </div>
      <div className="display-votes-ans">
        <p>{question.noOfAnswers}</p>
        <p>Answers</p>
      </div>
      <div className="display-question-details">
        <Link to={`/questions/${question._id}`} className="question-title-link capitalize">{question.questionTitle}</Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.questionTags.map((tag) => (
              <p className="uppercase" key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            Asked: {moment(question.askedOn.toLocaleString()).fromNow()} {question.userPosted}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Questions;
