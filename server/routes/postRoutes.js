import express  from "express";
import { getAllPosts,createPost } from "../controllers/Posts.js";

const postRouter=express.Router();

postRouter.get('/get',getAllPosts)
postRouter.post('/create',createPost)

export default postRouter