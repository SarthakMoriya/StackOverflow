import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { createNewPost } from "../../actions/Posts";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("description",description);
    formData.append("userId",user.user._id);
    formData.append("image",image);
    formData.append("userName",user?.user?.name);
    // dispatch(createNewPost({ description, userId: user.user._id,image:{}}, navigate));
    dispatch(createNewPost( formData,navigate));
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Create A Post</h1>
        {/* {user?.user._id ? <p>hello</p> : <p>lilo</p>} */}
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Description</h4>
              <p>Tell us about your post</p>
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                id="ask-ques-title"
                placeholder="a good example"
              />
            </label>
            <label>Image</label>
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
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

export default CreatePostForm;
