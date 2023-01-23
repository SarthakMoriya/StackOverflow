import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";

import "./Display.css"

const DisplayBlogs = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogReducer);
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-3">
        {blogs?.data
          ?.filter((bid) => bid._id === id)
          .map((blog) => (
            <div key={blog._id}>
                <h3 className="">{blog.title}</h3>
                <h5 className="">{blog.description}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayBlogs;
