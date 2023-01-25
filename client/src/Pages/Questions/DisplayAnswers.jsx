import React, { useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";
import { Link, useLocation, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useSelector ,useDispatch} from "react-redux";

import {deleteAnswer } from '../../actions/Question'

const DisplayAnswers = ({ question }) => {
  const location = useLocation();
  const {id} = useParams();
  const url = "http://localhost:3000/";
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const handleShare = () => {
    copy(url + location.pathname);
    alert("link copied! " + url + location.pathname);

  };

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers));
  };

  useEffect(()=>{console.log(question)},[])
  return (
    <div>
      {question?.answer?.map((ans) => (
        <div className="display-ans" key={ans?._id}>
          <p>{ans?.answerBody}</p>
          <div className="question-actions-user">
            <div className="">
              <button onClick={handleShare}>Share</button>
              {User?.user?._id === question?.userId && (
                <button
                  onClick={() => {
                    handleDelete(ans?._id, question.noOfAnswers);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="">
              <p>Answer {moment(ans?.answeredOn).fromNow()}</p>
              <Link to={`/users/${ans.userId}`} className="user-link">
                <Avatar backgroundColor="orange" px="8px" py="5px">
                  {ans.userAnswered[0]}
                </Avatar>
                <div className="">{ans.userPosted}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
