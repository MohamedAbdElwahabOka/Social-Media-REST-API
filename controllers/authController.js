import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { CustomError } from "../middlewares/error.js";



const registerController = async (req, res, next) => {
    try {
        const { password, username, email } = req.body
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            throw new CustomError("Username or email already exists!")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ ...req.body, password: hashedPassword })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)


    } catch (error) {
        next(error)
    }

}


const loginController = async (req, res, next) => {

    try {
        let user;
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email })
        }
        else {
            user = await User.findOne({ username: req.body.username })
        }

        if (!user) {
            throw new CustomError("User not found!", 404)
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
            throw new CustomError("Wrong Password or email", 401)

        }
        const { password, ...data } = user._doc
        // const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, process.env.EXPIRES_IN)
        const token = jwt.sign({ _id: user._id }, "kfidfkalskksdjaisddddfkasdf", { expiresIn: "3d" })
        res.cookie("token", token).status(200).json(data)



    } catch (error) {
        next(error)
    }

}



const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("logeed out ")

    } catch (error) {
        next(error)

    }
}


export { registerController, loginController, logoutController };








