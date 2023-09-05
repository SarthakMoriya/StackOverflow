import axios from "axios";

// const API = axios.create({ baseURL: 'https://stackoverflowbackend-y6mv.onrender.com' })
const API = axios.create({ baseURL: 'https://stackoverflowbackendlatest.onrender.com' })

// const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('Profile')){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
//     }
// })

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const changePassword = (data) => API.patch("/user/updatepassword", data);
export const recoverPassword = (data) => API.post("/user/forgotpassword", data);
export const newPassword = (data) => API.post("/user/newpassword", data);

export const postQuestion = (questionData) =>
  API.post("/questions/ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);

export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get("/user/getallusers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/updateprofile/${id}`, { ...updateData });

export const fetchAllPosts = () => API.get("/post/get");
export const fetchAllBlogs = () => API.get("/post/getblogs");
export const createPost = (postBody) => API.post("/post/create", postBody);
export const createBlogPost = (postBody) =>
  API.post("/post/createblog", postBody);

export const updatePostLikes = (userId, postId) =>
  API.patch("/post/likePost", { postId, userId });
export const updateBlogLikes = (userId, postId) =>
  API.patch("/post/likeBlog", { postId, userId });

export const addFriend = (userId, friendId) =>
  API.patch("/user/addFriend", { userId, friendId });
export const removeFriend = (userId, friendId) =>
  API.patch("/user/removeFriend", { userId, friendId });

export const setSubscription = (userId, type) =>
  API.patch("/user/setsubscription", { userId, type });
export const updateQuestionsLeft = (userId, quesLeft) =>
  API.patch("/user/updatequestionsleft", { userId, quesLeft });

export const deletePost = (postId) => API.delete(`/post/deletepost/${postId}`);
export const deleteBlog = (blogId) => API.delete(`/post/deleteblog/${blogId}`);
