import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./CreatePostOption.css";
import { createNewBlogPost } from "../../actions/Posts";

const CreateBlogPost = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user.user._id;
  const userName = user.user.name;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData=new FormData();
    // formData.append("description",desc);
    // formData.append("userId",user.user._id);
    // formData.append("title",title);
    // dispatch(createNewBlogPost( formData,navigate));
    dispatch(createNewBlogPost({ title, description, userId ,userName}, navigate));
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div className="ask-question">
          <div className="ask-ques-container">
            <h1>Create A Text Post</h1>
            {/* {user?.user._id ? <p>hello</p> : <p>lilo</p>} */}
            <form onSubmit={handleSubmit}>
              <div className="ask-form-container">
                <label htmlFor="ask-ques-title">
                  <h4>Title</h4>
                  <p>Tell us about your post</p>
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    id="ask-ques-title"
                    placeholder="a good example"
                  />
                </label>
                <label htmlFor="ask-ques-title">
                  <h4>Description</h4>
                  <p>Tell us about your post</p>
                  <textarea
                    id="w3review"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    name="w3review"
                    rows="4"
                    cols="50"
                  ></textarea>
                </label>
                <button
                  type="submit"
                  value="Review your Question"
                  className="review-btn"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
