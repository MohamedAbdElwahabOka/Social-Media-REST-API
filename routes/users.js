import express from "express"
import { getUserController, updateUserController } from "../controllers/userController.js"

const router = express.Router();


//GET USER
router.get("/:userId", getUserController)

//UPDATE USER
router.put("/update/:userId", updateUserController)



export default router;