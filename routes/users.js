import express from "express"
import {
    getUserController,
    updateUserController,
    followUserController,
    unfollowUserController,
    blockUserController,
    unblockUserController,
    getBlockedUsersController,
    deleteUserController
} from "../controllers/userController.js"

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
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

//GET USER
router.get("/:userId", getUserController)

//UPDATE USER
router.put("/update/:userId", updateUserController)

//FOLLOW USER
router.post("/follow/:userId", followUserController)

//UNFOLLOW USER
router.post("/unfollow/:userId", unfollowUserController)

//BLOCK USER
router.post("/block/:userId", blockUserController)

router.post("/Unblock/:userId", unblockUserController)

//GET BLOCKED USERS
router.get("/blocked/:userId", getBlockedUsersController)

//DELETE USER
router.delete("/delete/:userId", deleteUserController)



export default router;