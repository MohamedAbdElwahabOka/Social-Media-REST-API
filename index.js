import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import bcrypt from "bcrypt"
import { errorHandler, CustomError } from "./middlewares/error.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"


const app = express();

dotenv.config()
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

app.use(errorHandler)

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "A simple"
        },
        servers: [
            {
                url: "http://localhost:5000"
            },
        ],
    },
    apis: ["./routes/*.js"],

}

const spacs = swaggerJSDoc(option)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spacs))
app.listen(5000, () => {
    connectDB();
    console.log("App is running will ");
})