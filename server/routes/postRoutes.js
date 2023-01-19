import express from "express";
import { getAllPosts, likePost } from "../controllers/Posts.js";

const postRouter = express.Router();

postRouter.get('/get', getAllPosts)
postRouter.patch('/likePost', likePost)

export default postRouter