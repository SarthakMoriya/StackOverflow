import Posts from '../models/postSchema.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json({ result: posts })
    } catch (err) {
        console.log(err);
    }
}

export const createPost = async (req, res) => {
    try {
        const { userId, desc, url, type } = req.body;
        let imageUrl="";
        let videoUrl="";
        
        if(type=="image") {imageUrl=url}
        if(type=="video") {videoUrl=url}

        const post = await Posts.create({
            userId,
            desc,
            imageUrl,
            videoUrl,
            postedOn: Date.now()
        })
        res.status(201).json({ result: post })
    } catch (error) {
        console.log(err);
    }
}