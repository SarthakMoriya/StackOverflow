import React from "react";
import { useSelector } from "react-redux";

const PostMainBar = () => {
  const posts = useSelector((state) => state.postReducer);
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
      </div>
      <div>
        {posts.map((post) => (
          <h1 key={post.userId}>{post.desc}</h1>
        ))}
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default PostMainBar;
