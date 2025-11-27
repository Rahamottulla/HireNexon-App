import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// ========================= GOOGLE AUTH =========================

// Step 1: Redirect user to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Handle callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const { user, token } = req.user;

    // Redirect to frontend with JWT token
    const redirectURL = `${process.env.FRONTEND_URL}/auth/success?token=${token}`;
    res.redirect(redirectURL);
  }
);

// ========================= MICROSOFT AUTH =========================

// Step 1: Redirect user to Microsoft login
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { prompt: "select_account" })
);

// Step 2: Handle callback from Microsoft
router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/login", session: false }),
  (req, res) => {
    const { user, token } = req.user;

    // Redirect to frontend with JWT token
    const redirectURL = `${process.env.FRONTEND_URL}/auth/success?token=${token}`;
    res.redirect(redirectURL);
  }
);

// ========================= LOGOUT (Optional) =========================
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });
});

export default router;
