
import User from "../models/User.js";
import mongoose from 'mongoose';
import { CustomError } from "../middlewares/error.js";


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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{userId}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */

const getUserController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new CustomError("Invalid User ID format", 400);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("No User Found!", 404);
        }
        const { password, ...data } = user._doc;
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserController = async (req, res, next) => {

    const { userId } = req.params
    const updateData = req.body
    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new CustomError("Invalid User ID format", 400);
        }
        const userToUpdate = await User.findById(userId)
        if (!userToUpdate) {
            throw new CustomError("User not found!", 404)
        }

        Object.assign(userToUpdate, updateData)
        await userToUpdate.save();

        const { password, ...userWithoutPassword } = userToUpdate._doc;


        res.status(200).json({ message: "User updated successfully!", user: userWithoutPassword })

    }
    catch (error) {
        next(error)
    }
}

const followUserController = async (req, res, next) => {

    const { userId } = req.params
    const { _id } = req.body

    try {
        if (userId === _id) {
            throw new CustomError("You can not follow yourself", 500)
        }

        const userToFollow = await User.findById(userId)
        const loggedInUser = await User.findById(_id)


        if (!userToFollow || !loggedInUser) {
            throw new CustomError("User not found!", 404)
        }

        if (loggedInUser.following.includes(userId)) {
            throw new CustomError("Already following this user!", 400)
        }
        if (loggedInUser.blockList.includes(userId)) {
            throw new CustomError("You are blocked by this user!", 400)
        }
        if (userToFollow.blockList.includes(_id)) {
            throw new CustomError("You can not follow this user!", 400)
        }

        loggedInUser.following.push(userId)
        userToFollow.followers.push(_id)

        await loggedInUser.save()
        await userToFollow.save()

        res.status(200).json({ message: "Successfully followed user!" })

    }
    catch (error) {
        next(error)
    }
}

const unfollowUserController = async (req, res, next) => {
    const { userId } = req.params
    const { _id } = req.body

    try {
        if (userId === _id) {
            throw new CustomError("You can not unfollow yourself", 500)
        }

        const userToUnfollow = await User.findById(userId)
        const loggedInUser = await User.findById(_id)



        if (!userToUnfollow || !loggedInUser) {
            throw new CustomError("User not found!", 404)
        }

        if (!loggedInUser.following.includes(userId)) {
            throw new CustomError("Not following this user", 400)
        }

        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId)
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== _id)

        await loggedInUser.save()
        await userToUnfollow.save()

        res.status(200).json({ message: "Successfully unfollowed user!" })

    }
    catch (error) {
        next(error)
    }
}


const blockUserController = async (req, res, next) => {
    const { userId } = req.params
    const { _id } = req.body
    try {
        if (userId === _id) {
            throw new CustomError("You can not block yourself", 500)
        }

        const userToBlock = await User.findById(userId)
        const loggedInUser = await User.findById(_id)

        if (!userToBlock || !loggedInUser) {
            throw new CustomError("User not found!", 404)
        }

        if (loggedInUser.blockList.includes(userId)) {
            throw new CustomError("This user is already blocked!", 400)
        }

        loggedInUser.blockList.push(userId)

        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId)
        userToBlock.followers = userToBlock.followers.filter(id => id.toString() !== _id)

        await loggedInUser.save()
        await userToBlock.save()

        res.status(200).json({ message: "Successfully blocked user!" })

    }
    catch (error) {
        next(error)
    }
}

const unblockUserController = async (req, res, next) => {
    const { userId } = req.params
    const { _id } = req.body
    try {
        if (userId === _id) {
            throw new CustomError("You can not unblock yourself", 500)
        }

        const userToUnblock = await User.findById(userId)
        const loggedInUser = await User.findById(_id)

        if (!userToUnblock || !loggedInUser) {
            throw new CustomError("User not found!", 404)
        }

        if (!loggedInUser.blockList.includes(userId)) {
            throw new CustomError("Not blocking is user!", 400)
        }

        loggedInUser.blockList = loggedInUser.blockList.filter(id => id.toString() != userId)

        await loggedInUser.save()

        res.status(200).json({ message: "Successfully unblocked user!" })

    }
    catch (error) {
        next(error)
    }
}

const getBlockedUsersController = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId).populate("blockList", "username fullName profilePicture")
        if (!user) {
            throw new CustomError("User not found!", 404)
        }

        const { blockList, ...data } = user

        res.status(200).json(blockList)

    }
    catch (error) {
        next(error)
    }
}









export { getUserController, updateUserController, followUserController, unfollowUserController, blockUserController, unblockUserController, getBlockedUsersController };