import dotenv from "dotenv";
dotenv.config();
// Check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);


import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Route integration
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ HireSphere Backend Running Successfully 🚀");
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ HireSphere Backend running at http://localhost:${PORT}`);
  console.log(`🔑 JWT_SECRET loaded: ${JWT_SECRET ? "Yes" : "❌ Not found"}`);
});
