import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
import { errorHandler } from "./middlewares/error.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

dotenv.config()

// 1. Initialize App & Database
const app = express();
connectDB(); // كان ناقص استدعاء الدالة دي عشان يتصل بالداتا

app.use(express.json())

// 2. Swagger Configuration
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Media API",
            version: "1.0.0",
            description: "API documentation for Social Media Application using Node.js & Express"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server"
            },
            {
                // ده الرابط اللي ظهر في السكرين شوت بتاعتك
                url: "https://social-media-rest-api-gamma.vercel.app",
                description: "Production Server (Vercel)"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJSDoc(options)

// 3. CSS Fix for Vercel (الحل لمشكلة الشاشة البيضاء)
// بنجيب ملف الـ CSS من رابط خارجي عشان vercel مش بيعرف يقرا الملفات المحلية للـ swagger
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, {
        customCssUrl: CSS_URL,  // ده السطر المهم جداً
        customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 30px 0 }' // الستايل بتاعك
    })
)

// 4. Routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

// 5. Error Handler Middleware
app.use(errorHandler)

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});