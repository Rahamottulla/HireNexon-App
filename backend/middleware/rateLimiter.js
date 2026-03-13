// backend/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

// Auth endpoints — login, register (strict)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      10,               // 10 attempts per 15 min
  message:  { message: "Too many attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders:   false,
});

// /auth/me — called on every page load (relaxed)
export const meLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max:      60,              // 60 calls per minute
  message:  { message: "Too many requests." },
  standardHeaders: true,
  legacyHeaders:   false,
});

// Refresh token endpoint
export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      20,               // 20 refresh attempts
  message:  { message: "Too many refresh attempts." },
  standardHeaders: true,
  legacyHeaders:   false,
});
