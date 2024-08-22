import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import bcrypt from "bcrypt"
import { errorHandler, CustomError } from "./middlewares/error.js"


const app = express();

dotenv.config()
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

app.use(errorHandler)


app.listen(5000, () => {
    connectDB();
    console.log("App is running will ");
})