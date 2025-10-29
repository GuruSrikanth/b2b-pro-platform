import express from "express";
import cors from "cors";
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("API running"));
app.listen(5000, () => console.log("Server running on port 5000"));



import pkg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.connect().then(() => console.log("DB Connected"));



import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);



import userRoutes from "./routes/users.js";
import connectionRoutes from "./routes/connections.js";
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);
