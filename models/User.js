
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
 *         - fullName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         bio:
 *           type: string
 *           description: The bio of the user
 *         profilePicture:
 *           type: string
 *           description: The profile picture URL of the user
 *         coverPicture:
 *           type: string
 *           description: The cover picture URL of the user
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *           description: The posts created by the user
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *           description: The followers of the user
 *         following:
 *           type: array
 *           items:
 *             type: string
 *           description: The users followed by this user
 *         blockList:
 *           type: array
 *           items:
 *             type: string
 *           description: The users blocked by this user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was last updated
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }], followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    blockList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })



export default mongoose.model("User", userSchema);


// const User = mongoose.model("User", userSchema)

// module.exports = User
