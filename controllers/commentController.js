import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import { CustomError } from "../middlewares/error.js"

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

const createComment = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) throw new CustomError("Post not found!", 404)
        const newComment = new Comment({ ...req.body, user: req.user._id, post: req.params.postId })
        const savedComment = await newComment.save()
        await post.updateOne({ $push: { comments: savedComment._id } })
        res.status(201).json(savedComment)
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) throw new CustomError("Comment not found!", 404)
        if (comment.user.toString() !== req.user._id) throw new CustomError("You can delete only your comments!", 403)
        await Comment.findByIdAndDelete(req.params.id)
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: req.params.id } })
        res.status(200).json("Comment has been deleted!")
    } catch (error) {
        next(error)
    }
}

export { createComment, deleteComment }
