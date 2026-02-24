// backend/features/auth/socialAuth.routes.js
import express from "express";
import passport from "passport";

const router = express.Router();

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
      secure: true,   
      sameSite: "None",
      domain: ".hirenexon.com",
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
      secure: true,
      sameSite: "None",
      domain: ".hirenexon.com",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// LOGOUT 
router.get("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".hirenexon.com",
  });

  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

export default router;

