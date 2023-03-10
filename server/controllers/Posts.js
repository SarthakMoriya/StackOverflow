// import { get } from 'mongoose';
import Posts from '../models/postSchema.js'
import Blogs from '../models/BlogSchema.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();

        res.status(200).json(posts)
    } catch (err) {
        console.log(err);
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs)
    } catch (err) {
        console.log(err);
    }
}

export const createPost = async (req, res) => {
    try {
        // console.log(req.body.image)
        //  console.log(req.file);
        console.log(req.body);
        const postBody = req.body;
        // console.log(postBody);
        const createdPost = await Posts.create({
            description: postBody.description,
            userId: postBody.userId,
            imageUrl: req.file.path,
            userName: postBody.userName,
        })
        res.status(201).json({ data: createdPost })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res,) => {
    const { userId, postId } = req.body;
    // console.log(req.body)
    // if (!mongoose.Types.ObjectId.isValid(postId)) {
    //     return res.status(404).json("Question not vailable")
    // }

    try {
        const getPost = await Posts.findById(postId);
        const likedornot = getPost.likes.findIndex(id => id === String(userId));
        // console.log(likedornot)
        if (likedornot !== -1) {
            getPost.likes = getPost.likes.filter(id => id !== String(userId))
        } else {
            getPost.likes.push(userId)
        }
        await Posts.findByIdAndUpdate(postId, getPost)
        res.status(200).json({ message: "Liked Successffully!!" })
    } catch (err) { console.log(err) }
}

export const likeBlog = async (req, res,) => {
    const { userId, postId } = req.body;
    console.log(req.body)

    try {
        const getBlog = await Blogs.findById(postId);
        const likedornot = getBlog.likes.findIndex(id => id === String(userId));
        if (likedornot !== -1) {
            getBlog.likes = getBlog.likes.filter(id => id !== String(userId))
        } else {
            getBlog.likes.push(userId)
        }
        await Blogs.findByIdAndUpdate(postId, getBlog)
        res.status(200).json({ message: "Liked Successffully!!" })
    } catch (err) { console.log(err) }
}


export const createBlogPost = async (req, res) => {
    try {
        const postBody = req.body;
        console.log(postBody);
        const createdBlog = await Blogs.create({
            description: postBody.description,
            userId: postBody.userId,
            title: postBody.title,
            userName: postBody.userName
        })
        res.status(201).json({ data: createdBlog })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    try {
        await Posts.findByIdAndRemove(_id)
        res.status(200).json({ message: "Successfully Destroyed!" })
    } catch (error) {
        res.status(500).json("ERRURRR!")
    }
}

export const deleteBlog = async (req, res) => {
    const { id: _id } = req.params;
    try {
        await Blogs.findByIdAndRemove(_id)
        res.status(200).json({ message: "Successfully Destroyed!" })
    } catch (error) {
        res.status(500).json("ERRURRR!")
    }
}