// backend/features/auth/auth.routes.js
import express from "express";
import { register, login, logout, verifyEmail, resendVerification, checkAvailability,
getMe, refreshAccessToken, getSessions, revokeSession, revokeAllSessions,
} from "./auth.controller.js";
import forgotRoutes from "./forgotPassword.routes.js";
import socialRoutes from "./socialAuth.routes.js";
import auth from "../../middleware/auth.js";
import { authLimiter, meLimiter, refreshLimiter,} from "../../middleware/rateLimiter.js";

const router = express.Router();

// ── Public routes (rate limited) ─────────────────────────────────
router.post("/login",               authLimiter,    login);
router.post("/register",            authLimiter,    register);
router.post("/logout",                              logout);
router.post("/refresh",             refreshLimiter, refreshAccessToken);
router.get("/verify-email/:token",                  verifyEmail);
router.get("/check-availability",                   checkAvailability);
router.post("/resend-verification", authLimiter,    resendVerification);

// ── Protected routes ─────────────────────────────────────────────
router.get("/me", meLimiter, auth(), getMe);

// Session management
router.get("/sessions",         auth(), getSessions);
router.delete("/sessions/:id",  auth(), revokeSession);
router.delete("/sessions",      auth(), revokeAllSessions);

// ── Nested routes ─────────────────────────────────────────────────
router.use("/password", forgotRoutes);
router.use("/social",   socialRoutes);

export default router;
