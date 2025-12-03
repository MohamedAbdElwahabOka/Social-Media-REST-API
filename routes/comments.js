import express from "express"
import { createComment, deleteComment } from "../controllers/commentController.js"
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router()

/**
 * @swagger
 * /api/comments/create/{postId}:
 *   post:
 *     summary: Create a comment for a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/create/:postId", verifyToken, createComment)

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:id", verifyToken, deleteComment)

export default router
