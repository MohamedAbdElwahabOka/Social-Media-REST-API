import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import bcrypt from "bcrypt"


const app = express();

dotenv.config()
app.use(express.json())
app.use("/api/auth", authRoute)


app.listen(5000, () => {
    connectDB();
    console.log("App is running will ");
})