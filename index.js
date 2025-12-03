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
connectDB(); // الاتصال بقاعدة البيانات

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
                // تأكد إن الرابط ده هو رابط مشروعك على فيرسل
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

// 3. THE FIX: Load Swagger Assets from CDN for Vercel
// ده الجزء اللي بيصلح مشكلة الشاشة البيضاء
// بنجيب ملفات التصميم والسكريبتات من سيرفر خارجي لأن Vercel مش بيقرأ الملفات المحلية
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js";
const JS_PRESET_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js";

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, {
        customCssUrl: CSS_URL,
        customJs: [JS_URL, JS_PRESET_URL], // تحميل ملفات الجافاسكريبت الضرورية
        customCss: '.swagger-ui .topbar { display: none } .swagger-ui .info { margin: 30px 0 }', // إخفاء الشريط العلوي
        customSiteTitle: "Social Media API Docs"
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