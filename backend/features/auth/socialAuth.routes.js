// backend/features/auth/socialAuth.routes.js
import express from "express";
import passport from "passport";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";

// GOOGLE AUTH 
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
    const { token } = req.user;
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,    // true only in production
      sameSite: isProduction ? "None" : "Lax", // because frontend + backend different domain
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// MICROSOFT AUTH 
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
    const { token } = req.user;
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// LOGOUT 
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

export default router;

