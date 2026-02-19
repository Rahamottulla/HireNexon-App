// backend/server.js
import dotenv from "dotenv";
dotenv.config();
console.log("Environment loaded");

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "./config/passport.js";
import passport from "passport"; //continue with google & microsoft

// Import routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";
import socialAuthRoutes from "./routes/socialAuthRoutes.js";

// Port
const PORT = process.env.PORT || 5000;

// Initialize Express(trust proxy for render)
const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://hirenexon.com"],
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", forgotPasswordRoutes);
app.use("/api/social", socialAuthRoutes);

// Default & Error Routes 
app.get("/", (_req, res) => {
  res.send("✅ HireNexon Backend Running Successfully 🚀");
});

app.use((_req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Internal server error" });
});

// Start Server 
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ HireNexon Backend running at https://api.hirenexon.com`);
      console.log(`🔑 JWT_SECRET loaded: ${process.env.JWT_SECRET ? "Yes" : "❌ Not found"}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
