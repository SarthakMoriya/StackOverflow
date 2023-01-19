import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PostAnswer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faComment } from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { likeAPost } from "../../actions/Posts";

const PostMainBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:3000/posts";
  const posts = useSelector((state) => state.postReducer);
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user.user._id;
  console.log(posts);

  const handleShare = (postId) => {
    copy(url + postId);
    alert("link copied! " + url + postId);
  };

  const handleCreatePost = () => {
    navigate("/posts/createPost");
  };

  const handleLikes = (postId) => {
    dispatch(likeAPost(userId, postId));
  };

  return (
    <div className="post-main-bar">
      <div>
        <h2
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          COMMUNITY SECTION
        </h2>
        <button className="post-btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      <div className="post-container-main">
        {posts.data.map((post) => (
          <div key={post._id} className="single-posts">
            {/* <div className="image">{post.imageUrl}</div> */}
            <img
              src={`http://localhost:5000/${post.imageUrl}`}
              alt=""
              className="post-image"
            />
            <div className="description">{post.description}</div>
            <div className="like-comment">
              <div className="">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icons-post"
                  onClick={() => {
                    handleLikes(post._id);
                  }}
                />
                <div
                  className=""
                  onClick={() => {
                    handleLikes(post._id);
                  }}
                >
                  {post.likes.length} likes
                </div>
              </div>
              <FontAwesomeIcon
                icon={faShare}
                onClick={() => handleShare(post._id)}
                className="icons-post"
              />
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostMainBar;
