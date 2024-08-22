import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import dotenv from "dotenv"
import cookie from 'cookie-parser'
import { registerController, loginController, logoutController } from "../controllers/authController.js"
dotenv.config()




const router = express.Router()


//REGISTER
router.post("/register", registerController)


//LOGIN

router.post("/login", loginController)



//LOGOUT

router.get("/logout", logoutController)



export default router;