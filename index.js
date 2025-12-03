import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comments.js"
import { errorHandler } from "./middlewares/error.js"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Media API",
            version: "1.0.0",
            description: "Full API documentation for Social Media Application with Users, Posts, Comments"
        },
        servers: [
            { url: "http://localhost:5000", description: "Local Development" },
            { url: "https://social-media-rest-api-gamma.vercel.app", description: "Production (Vercel)" }
        ],
        components: {
            securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./routes/*.js", "./controllers/*.js", "./models/*.js"]
}

const specs = swaggerJSDoc(options)
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css"
const JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js"
const JS_PRESET_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, {
    customCssUrl: CSS_URL,
    customJs: [JS_URL, JS_PRESET_URL],
    customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 30px 0 }',
    customSiteTitle: "Social Media API Docs"
}))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
