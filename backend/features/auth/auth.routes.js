// backend/features/auth/auth.routes.js
import express from "express";
import {register, login, logout, verifyEmail, resendVerification, getMe,
checkAvailability } from "./auth.controller.js";
import forgotRoutes from "./forgotPassword.routes.js";
import socialRoutes from "./socialAuth.routes.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// Main Auth Routes
router.get("/me", auth(), getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);
router.get("/check-availability", checkAvailability);
router.post("/resend-verification", resendVerification);

// Nested Routes
router.use("/password", forgotRoutes);
router.use("/social", socialRoutes);

export default router;
