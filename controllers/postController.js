import Post from "../models/Post.js"
import User from "../models/User.js"
import Comment from "../models/Comment.js"
import { CustomError } from "../middlewares/error.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user
 *         - caption
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         caption:
 *           type: string
 *         image:
 *           type: array
 *           items:
 *             type: string
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 */

const createPost = async (req, res, next) => {
    try {
        const newPost = new Post({
            ...req.body,
            user: req.user._id,
            image: req.files ? req.files.map(file => file.path) : []
        })
        const savedPost = await newPost.save()
        await User.findByIdAndUpdate(req.user._id, { $push: { posts: savedPost._id } })
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new CustomError("Post not found!", 404)
        if (post.user.toString() !== req.user._id) throw new CustomError("You can update only your posts!", 403)
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new CustomError("Post not found!", 404)
        if (post.user.toString() !== req.user._id) throw new CustomError("You can delete only your posts!", 403)
        await Post.findByIdAndDelete(req.params.id)
        await User.findByIdAndUpdate(req.user._id, { $pull: { posts: req.params.id } })
        await Comment.deleteMany({ post: req.params.id })
        res.status(200).json("Post has been deleted!")
    } catch (error) {
        next(error)
    }
}

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "username profilePicture")
            .populate({ path: "comments", populate: { path: "user", select: "username profilePicture" } })
        if (!post) throw new CustomError("Post not found!", 404)
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate("user", "username profilePicture").sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) throw new CustomError("User not found!", 404)
        const posts = await Post.find({ user: req.params.userId }).populate("user", "username profilePicture").sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

const likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) throw new CustomError("Post not found!", 404)
        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } })
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.user._id } })
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        next(error)
    }
}

export { createPost, updatePost, deletePost, getPost, getAllPosts, getUserPosts, likePost }
