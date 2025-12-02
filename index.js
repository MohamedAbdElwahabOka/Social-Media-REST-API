import express from "express"
import connectDB from "./Database/db.js"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js"
// import bcrypt from "bcrypt"
import { errorHandler, CustomError } from "./middlewares/error.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

const app = express();

dotenv.config()
app.use(express.json())

// Swagger Configuration
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Media API", // عدلت الاسم ليكون معبر أكتر
            version: "1.0.0",
            description: "API documentation for Social Media Application using Node.js & Express"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server"
            },
            // {
            //     url: "https://your-app.onrender.com", // لما ترفع الموقع شيل الكومنت وغير اللينك ده
            //     description: "Production Server"
            // }
        ],
        // الإضافة دي مهمة جداً عشان زرار القفل (Authorize) يظهر
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
    // تأكد إن المسار ده بيشاور صح على ملفات الراوتس بتاعتك
    apis: ["./routes/*.js"],
}

const specs = swaggerJSDoc(options)

// CSS Code: اختياري بس بيخلي شكل الصفحة أحلى
const customCSS = `
  .swagger-ui .topbar { display: none }
  .swagger-ui .info { margin: 30px 0 }
`;

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCss: customCSS })
)

// Routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

// Error Handler Middleware (لازم يكون بعد الراوتس)
app.use(errorHandler)

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port 5000...");
})