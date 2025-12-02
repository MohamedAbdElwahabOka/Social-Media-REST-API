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
 *   - name: Users
 *     description: User management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         bio:
 *           type: string
 *         profileImage:
 *           type: string
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *         following:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         id: "123"
 *         username: "john_doe"
 *         email: "john@example.com"
 *         bio: "Hello, I'm John"
 *         profileImage: "https://example.com/profile.jpg"
 *         followers: []
 *         following: []
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/follow/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to follow
 *     responses:
 *       200:
 *         description: Follow action completed
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/unfollow/{userId}:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to unfollow
 *     responses:
 *       200:
 *         description: Unfollow action completed
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/block/{userId}:
 *   post:
 *     summary: Block a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to block
 *     responses:
 *       200:
 *         description: User blocked successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/unblock/{userId}:
 *   post:
 *     summary: Unblock a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to unblock
 *     responses:
 *       200:
 *         description: User unblocked successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/blocked/{userId}:
 *   get:
 *     summary: Get list of blocked users
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of blocked users
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

router.get("/:userId", getUserController);
router.put("/update/:userId", updateUserController);
router.post("/follow/:userId", followUserController);
router.post("/unfollow/:userId", unfollowUserController);
router.post("/block/:userId", blockUserController);
router.post("/unblock/:userId", unblockUserController);
router.get("/blocked/:userId", getBlockedUsersController);
router.delete("/delete/:userId", deleteUserController);

export default router;
