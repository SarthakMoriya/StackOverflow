import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        likes: {
            type: [String],
            default: [],
        },
        comments: {
            type: [
                {
                    userId: { type: String },
                    comment: { type: String },
                },
            ],
            default: [],
        },
        imageUrl: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Posts", PostSchema)