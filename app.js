import dotenv from "dotenv";
// Configure dotenv
dotenv.config({
    path: './.env'
})
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes.js"
import captainRoutes from "./routes/captain/captain.routes.js";
import userRoutes from "./routes/user/user.routes.js";
import adminRoutes from "./routes/admin/admin.routes.js";
const PORT = process.env.PORT || 3000;
import mongodb from "./database/db.js";
import { db } from "./models/index.js";
// Define db variable global
global.db = db;


import swaggerUi from "swagger-ui-express";
import { readFile } from 'fs/promises';
// const swaggerDocument = JSON.parse(await readFile(new URL('./services/swagger.json', import.meta.url)));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read swagger.json from services folder
const swaggerPath = path.join(__dirname, "services/swagger.json");
const swaggerDocument = JSON.parse(await readFile(swaggerPath, "utf8"));


// Create an express app
const app = express();

// Use helmet!
app.use(helmet());

// Use cors!
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST",
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

// Accept data in json format, and url encoded format,and static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Define all routes here
app.use("/api", authRoutes, captainRoutes, userRoutes, adminRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// FOR LOCAL

// app.listen(PORT, () => {
//     console.log(`⚙️  Server is running on port ${PORT}`);
// })

// FOR VERCEL 
export default app;