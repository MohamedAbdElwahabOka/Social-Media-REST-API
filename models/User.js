import mongoose from "mongoose"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profilePicture:
 *           type: string
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *         following:
 *           type: array
 *           items:
 *             type: string
 *         blockedUsers:
 *           type: array
 *           items:
 *             type: string
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 */

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema)
export default User
