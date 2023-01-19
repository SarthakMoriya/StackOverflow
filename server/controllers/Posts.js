import { get } from 'mongoose';
import Posts from '../models/postSchema.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        // console.log("Fetched",posts);
        res.status(200).json(posts)
    } catch (err) {
        console.log(err);
    }
}

export const createPost = async (req, res) => {
    try {
        // console.log(req.body.image)
        //  console.log(req.file);
        //  console.log(req.body);
        const postBody = req.body;
        // console.log(postBody);
        const createdPost = await Posts.create({
            description: postBody.description,
            userId: postBody.userId,
            imageUrl: req.file.path
        })
        res.status(201).json({ data: createdPost })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res,) => {
    const { userId, postId } = req.body;
    console.log(req.body)
    // if (!mongoose.Types.ObjectId.isValid(postId)) {
    //     return res.status(404).json("Question not vailable")
    // }

    try {
        const getPost = await Posts.findById(postId);
        const likedornot = getPost.likes.findIndex(id => id === String(userId));
        console.log(likedornot)
        if (likedornot !== -1) {
            getPost.likes = getPost.likes.filter(id => id !== String(userId))
        } else {
            getPost.likes.push(userId)
        }
        await Posts.findByIdAndUpdate(postId, getPost)
        res.status(200).json({ message: "Liked Successffully!!" })
    } catch (err) { console.log(err) }
}