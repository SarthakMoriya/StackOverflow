import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likeAPost } from "../../../actions/Posts";
import copy from "copy-to-clipboard";

import "./Display.css";

const DisplayPosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const url = "http://localhost:3000/post/";
  const userId = user?.user?._id;
  const { id } = useParams();
  const posts = useSelector((state) => state.postReducer);

  const handleShare = (postId) => {
    copy(url + postId);
    alert("link copied! " + url + postId);
  };
  const handleLikes = (postId) => {
    dispatch(likeAPost(userId, postId));
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-3">
        {posts?.data
          ?.filter((bid) => bid._id === id)
          .map((post) => (
            <div key={post._id}>
              <img
                src={`http://localhost:5000/${post?.imageUrl}`}
                alt=""
                className="post-image"
              />
              <div className="description">{post?.description}</div>
              <div className="like-comment">
                <div className="">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icons-post"
                    onClick={() => {
                      handleLikes(post?._id);
                    }}
                  />
                  <div
                    className=""
                    onClick={() => {
                      handleLikes(post?._id);
                    }}
                  >
                    {post?.likes?.length} likes
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faShare}
                  onClick={() => handleShare(post?._id)}
                  className="icons-post"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayPosts;
