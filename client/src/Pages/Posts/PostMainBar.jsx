import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./PostAnswer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare,faTrash } from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { likeAPost, likeABlog ,deleteBlogs,deletePosts} from "../../actions/Posts";
import Avatar from "../../components/Avatar/Avatar";

const PostMainBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:3000/post/";
  const posts = useSelector((state) => state.postReducer);
  const blogs = useSelector((state) => state.blogReducer);
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.user?._id;

  const handleShare = (postId) => {
    copy(url + postId);
    alert("link copied! " + url + postId);
  };
  const handleBlogShare = (postId) => {
    copy("http://localhost:3000/blog/" + postId);
    alert("link copied! " + "http://localhost:3000/blog/" + postId);
  };

  const handleCreatePost = () => {
    navigate("/posts/createPostForCommunity");
  };

  const handleLikes = (postId) => {
    dispatch(likeAPost(userId, postId));
  };
  const handleBlogLikes = (postId) => {
    dispatch(likeABlog(userId, postId));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePosts(postId))
  }

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlogs(blogId))
    console.log(blogId);
  }
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
        {posts?.data?.map((post) => (
          <div key={post?._id} className="single-posts">
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
              <Link
                to={`/users/${post?.userId}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar
                  backgroundColor="#009dff"
                  px="10px"
                  py="7px"
                  borderRadius="0%"
                  color="white"
                >
                  {post?.userName?.charAt(0)}
                </Avatar>
                <h4>{post?.username}</h4>
              </Link>
              {post.userId===user.user._id && (<FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeletePost(post?._id)}
                className="icons-post"
              />)}
            </div>
          </div>
        ))}
        {blogs?.data?.map((post) => (
          <div key={post._id} className="single-posts">
            <div className="title">{post?.title}</div>
            <div className="description-blog">
              <p>{post?.description}</p>
            </div>
            <div className="like-comment">
              <div className="">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icons-post"
                  onClick={() => {
                    handleBlogLikes(post?._id);
                  }}
                />
                <div>{post?.likes?.length} likes</div>
              </div>
              <FontAwesomeIcon
                icon={faShare}
                onClick={() => handleBlogShare(post?._id)}
                className="icons-post"
              />
              <Link
                to={`/users/${post?.userId}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar
                  backgroundColor="#009dff"
                  px="10px"
                  py="7px"
                  borderRadius="0%"
                  color="white"
                >
                  {post?.userName?.charAt(0)}
                </Avatar>
                <h4>{post?.userName}</h4>
              </Link>
              {post.userId===user.user._id && (<FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeleteBlog(post?._id)}
                className="icons-post"
              />)}
            </div>
          </div>
        ))}
        {/* {blogs.data?<h1>LUND</h1>:<h3>LODA</h3>} */}
      </div>
    </div>
  );
};

export default PostMainBar;
