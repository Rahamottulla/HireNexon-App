// backend/features/auth/auth.routes.js
import express from "express";
import { register, login, verifyEmail, resendVerification  } from "./auth.controller.js";
import forgotRoutes from "./forgotPassword.routes.js";
import socialRoutes from "./socialAuth.routes.js";

const router = express.Router();

// Main Auth Routes
router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

// Nested Routes
router.use("/password", forgotRoutes);
router.use("/social", socialRoutes);

export default router;
