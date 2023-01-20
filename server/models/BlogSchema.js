import mongoose, { Mongoose } from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String, required: true
        },
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
        }
    }
);

export default mongoose.model("Blogs", BlogSchema)