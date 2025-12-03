import mongoose from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - user
 *         - post
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         post:
 *           type: string
 *         text:
 *           type: string
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *         replies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               text:
 *                 type: string
 *               likes:
 *                 type: array
 *                 items:
 *                   type: string
 *               createdAt:
 *                 type: string
 *         createdAt:
 *           type: string
 */

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    text: { type: String, required: true, trim: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment
