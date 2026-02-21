// backend/features/auth/auth.routes.js
import express from "express";
import { register, login } from "./auth.controller.js";
import forgotRoutes from "./forgotPassword.routes.js";
import socialRoutes from "./socialAuth.routes.js";

const router = express.Router();

// Main Auth Routes
router.post("/register", register);
router.post("/login", login);

// Nested Routes
router.use("/password", forgotRoutes);
router.use("/social", socialRoutes);

export default router;
