import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import dotenv from "dotenv"
import cookie from 'cookie-parser'
dotenv.config()




const router = express.Router()


//REGISTER
router.post("/register", async (req, res) => {
    try {
        const { password, username, email } = req.body
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            return res.status(400).json("User already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ ...req.body, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)


    } catch (error) {
        res.status(500).json(error)
    }

})


//LOGIN

router.post("/login", async (req, res) => {
    try {
        let user;
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email })
        }
        else {
            user = await User.findOne({ username: req.body.username })
        }

        if (!user) {
            return res.status(404).json("User Not Found!")
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            return res.status(400).json("Wrong Password or email");

        }
        const { password, ...data } = user._doc
        // const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, process.env.EXPIRES_IN)
        const token = jwt.sign({ _id: user._id }, "kfidfkalskksdjaisddddfkasdf", { expiresIn: "3d" })
        res.cookie("token", token).status(200).json(data)



    } catch (error) {
        res.status(500).json(error)
    }
})



//LOGOUT

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("logeed out ")

    } catch (error) {
        res.status(500).json(error)

    }

})



//FETCH CURRENT USER



export default router;