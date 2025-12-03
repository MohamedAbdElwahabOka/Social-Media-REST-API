import express from "express"
import {
    createPost, updatePost, deletePost, getPost, getAllPosts, getUserPosts, likePost
} from "../controllers/postController.js"
import verifyToken from "../middlewares/verifyToken.js"
import upload from "../utils/upload.js"

const router = express.Router()

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post created
 */
router.post("/create", verifyToken, upload.array("images", 5), createPost)

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               caption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 */
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)
router.get("/:id", getPost)
router.get("/", getAllPosts)
router.get("/user/:userId", getUserPosts)
router.put("/like/:id", verifyToken, likePost)

export default router
