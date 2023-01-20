import React from "react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./CreatePostOption.css";

const CreatePostOption = () => {
  const navigate = useNavigate();

  const handlePhoto = () => {
    navigate("/posts/createPost");
  };
  const handleBlog = () => {
    navigate("/posts/createBlogPost");
  };
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1>CREATE A POST</h1>
        <div className="post-options">
          <button className="review-btn" onClick={handlePhoto}>
            PHOTO
          </button>
          <button className="review-btn" onClick={handleBlog}>BLOG</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostOption;
