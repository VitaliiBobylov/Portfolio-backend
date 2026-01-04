import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB";
import projectsRoutes from "./routes/projectsRoutes";
import authRoutes from "./routes/authRoutes";

if (!process.env.JWT_SECRET)
  throw new Error("JWT_SECRET is not defined in .env");
if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined in .env");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRoutes);
app.use("/api/auth", authRoutes);

connectMongoDB();

app.get("/", (_req, res) => {
  res.send("🚀 Backend + MongoDB працює");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
