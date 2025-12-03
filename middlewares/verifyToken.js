import jwt from "jsonwebtoken"
import { CustomError } from "./error.js"

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return next(new CustomError("You are not authenticated!", 401))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(new CustomError("Token is not valid!", 403))
        }
        req.user = user
        next()
    })
}

export default verifyToken
