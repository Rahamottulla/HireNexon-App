// backend/routes/userRoutes.js
import express from "express";
import { register, login, verifyEmail } from "../controllers/controllers.js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// =====================
// Signup
// =====================
router.post("/register", register);

// =====================
// Login
// =====================
router.post("/login", login);

// =====================
// Send verification email separately
// =====================
router.post("/send-verification-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    // Generate JWT token for email verification (1 hour)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const verifyUrl = `${BACKEND_URL}/api/users/verify/${token}`;


    // Send verification email
    await sendEmail(
      user.email,
      "🎉 Verify Your HireNexon Account",
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
        <h2 style="color:#0a66c2;">Verify Your Email</h2>
        <p>Hi <b>${user.username}</b>,</p>
        <p>Please click the button below to verify your email:</p>
        <a href="${verifyUrl}" 
           style="display:inline-block;margin:20px 0;background:#0a66c2;color:white;padding:12px 25px;border-radius:6px;text-decoration:none;font-weight:bold;">
           Verify Email
        </a>
        <p style="margin-top:20px;">This link expires in 1 hour.</p>
        <p>If you have any questions, reply to <a href="mailto:support@hirenexon.com" style="color:#0a66c2;">support@hirenexon.com</a>.</p>
        <p style="margin-top:20px;">Best regards,<br><strong>Team HireNexon</strong></p>
      </div>`
    );

    res.status(200).json({ message: "✅ Verification email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// =====================
// Email verification
// =====================
router.get("/verify/:token", verifyEmail);

export default router;
