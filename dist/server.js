"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectMongoDB_1 = require("./db/connectMongoDB");
const projectsRoutes_1 = __importDefault(require("./routes/projectsRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET is not defined in .env");
if (!process.env.MONGO_URI)
    throw new Error("MONGO_URI is not defined in .env");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/projects", projectsRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
(0, connectMongoDB_1.connectMongoDB)();
app.get("/", (_req, res) => {
    res.send("🚀 Backend + MongoDB працює");
});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
