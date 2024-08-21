const express = require("express");
const connectDB = require("./Database/db");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const bcrypt = require("bcrypt")

const app = express();

dotenv.config()
app.use(express.json())
app.use("/api/auth", authRoute)


app.listen(5000, () => {
    connectDB();
    console.log("App is running will ");
})