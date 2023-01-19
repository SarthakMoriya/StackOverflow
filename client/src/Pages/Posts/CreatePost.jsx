import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <CreatePostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
