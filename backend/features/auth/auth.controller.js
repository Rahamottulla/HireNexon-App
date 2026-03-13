// backend/features/auth/auth.controller.js
import User from "../user/user.model.js";
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import RefreshToken from "./refreshToken.model.js";
import EmailVerificationToken from "./emailVerificationToken.model.js";

const JWT_SECRET     = process.env.JWT_SECRET;
const BACKEND_URL    = process.env.BACKEND_URL  || "http://localhost:5000";
const FRONTEND_URL   = process.env.FRONTEND_URL || "http://localhost:5173";

// ── HELPERS ───────────────────────────────────────────────────────────────────

const issueAccessToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

const setAccessCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    secure:   true,
    sameSite: "none",
    maxAge:   24 * 60 * 60 * 1000, // 1 day
  });

const setRefreshCookie = (res, token) =>
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure:   true,
    sameSite: "none",
    maxAge:   30 * 24 * 60 * 60 * 1000, // 30 days
    path:     "/api/auth/refresh",
  });

const createRefreshToken = async (userId, req) => {
  const raw = crypto.randomBytes(64).toString("hex");
  await RefreshToken.create({
    userId,
    token:     raw,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    device: {
      userAgent: req.headers["user-agent"] || "unknown",
      ip:        req.ip                    || "unknown",
      lastUsed:  new Date(),
    },
  });
  return raw;
};

// ── CHECK AVAILABILITY ────────────────────────────────────────────────────────
export const checkAvailability = async (req, res) => {
  try {
    const { username, email } = req.query;
    if (!username && !email)
      return res.status(400).json({ message: "Provide username or email" });

    if (username) {
      const exists = await User.findOne({ username: username.trim().toLowerCase() });
      return res.json({ available: !exists });
    }

    if (email) {
      const exists = await User.findOne({ email: email.trim().toLowerCase() });
      return res.json({ available: !exists });
    }
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

// ── REGISTER ──────────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      if (existingUser.isVerified)
        return res.status(400).json({ message: "User already exists. Please login." });

      if (
        existingUser.lastVerificationSentAt &&
        Date.now() - existingUser.lastVerificationSentAt.getTime() < 60 * 1000
      ) {
        return res.status(429).json({
          message: "Please wait before requesting another verification email.",
        });
      }

      await EmailVerificationToken.deleteMany({ userId: existingUser._id });

      const rawToken   = crypto.randomBytes(32).toString("hex");
      const tokenHash  = crypto.createHash("sha256").update(rawToken).digest("hex");

      await EmailVerificationToken.create({
        userId:    existingUser._id,
        tokenHash,
        expiresAt: Date.now() + 60 * 60 * 1000,
      });

      existingUser.lastVerificationSentAt = new Date();
      await existingUser.save();

      const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;
      await sendEmail(existingUser.email, "Verify Your HireNexon Account",
        `Click below to verify: <a href="${verifyUrl}">Verify Email</a>`
      );

      return res.status(200).json({
        message: "Account exists but not verified. Verification email resent.",
      });
    }

    const newUser = new User({
      username:   username.trim().toLowerCase(),
      email:      email.trim().toLowerCase(),
      fullName:   fullName.trim(),
      password,
      isVerified: false,
    });
    await newUser.save();

    const rawToken  = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await EmailVerificationToken.create({
      userId:    newUser._id,
      tokenHash,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });

    newUser.lastVerificationSentAt = new Date();
    await newUser.save();

    const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;

    try {
      await sendEmail(
        newUser.email,
        "🎉 Verify Your HireNexon Account",
        `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;background:#f5f7fa;
                    padding:20px;border-radius:10px;">
          <div style="background:#ffffff;padding:25px;border:1px solid #e0e0e0;border-radius:10px;
                      box-shadow:0 2px 6px rgba(0,0,0,0.05);">
            <h2 style="color:#0a66c2;text-align:center;margin-bottom:20px;">Verify Your Email</h2>
            <p style="font-size:15px;color:#333;">Dear <b>${newUser.fullName}</b>,</p>
            <p style="font-size:15px;color:#333;line-height:1.6;">
              Welcome to <b>HireNexon</b>! Please verify your email address by clicking the button below:
            </p>
            <div style="text-align:center;margin:30px 0;">
              <a href="${verifyUrl}"
                style="display:inline-block;background:#0a66c2;color:#ffffff;padding:12px 30px;
                border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
                  Verify my email address
              </a>
            </div>
            <p style="font-size:14px;color:#555;">⏰ This link expires in <b>1 hour</b>.</p>
            <p style="margin-top:25px;font-size:14px;color:#333;">
              Best regards,<br><strong>Team HireNexon</strong>
            </p>
            <footer style="font-size:13px;color:#555;text-align:center;margin-top:25px;">
              <hr style="margin:15px 0;border:none;border-top:1px solid #ccc;"/>
              <p>📍 <strong>HireNexon Pvt. Ltd.</strong>, Chandigarh, India</p>
              <p>📞 +91 7407501936 &nbsp;|&nbsp; ✉️ support@hirenexon.com</p>
              <p style="color:#777;">© 2026 HireNexon. All rights reserved.</p>
            </footer>
          </div>
        </div>
        `
      );
    } catch (emailErr) {
      console.error("❌ EMAIL ERROR:", emailErr);
      return res.status(500).json({ message: "Failed to send verification email" });
    }

    const authToken = issueAccessToken(newUser);

    res.status(201).json({
      message: "Verification email sent! Please check your inbox.",
      token:   authToken,
      user: {
        id:       newUser._id,
        username: newUser.username,
        email:    newUser.email,
        role:     newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── VERIFY EMAIL ──────────────────────────────────────────────────────────────
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const tokenDoc  = await EmailVerificationToken.findOne({
      tokenHash,
      expiresAt: { $gt: Date.now() },
    });

    if (!tokenDoc) return res.status(400).send("Invalid or expired verification link");

    const user = await User.findById(tokenDoc.userId);
    if (!user) return res.status(400).send("User not found");

    user.isVerified = true;
    await user.save();
    await EmailVerificationToken.deleteMany({ userId: user._id });

    res.redirect(`${FRONTEND_URL}/verify-success`);
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid or expired verification link");
  }
};

// ── RESEND VERIFICATION ───────────────────────────────────────────────────────
export const resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.json({ message: "If the account exists and is not verified, a verification email has been sent." });

    if (user.isVerified)
      return res.json({ message: "Email already verified." });

    if (
      user.lastVerificationSentAt &&
      Date.now() - user.lastVerificationSentAt.getTime() < 60 * 1000
    ) {
      return res.status(429).json({ message: "Verification email already sent!" });
    }

    await EmailVerificationToken.deleteMany({ userId: user._id });

    const rawToken  = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await EmailVerificationToken.create({
      userId: user._id, tokenHash, expiresAt: Date.now() + 60 * 60 * 1000,
    });

    user.lastVerificationSentAt = new Date();
    await user.save();

    const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;
    await sendEmail(user.email, "Verify Your HireNexon Account",
      `Click below to verify: <a href="${verifyUrl}">Verify Email</a>`
    );

    res.json({ message: "A verification email has been sent to your email, please check." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  const { loginInput, password } = req.body;
  try {
    const query = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput)
      ? { email: loginInput.toLowerCase() }
      : { username: loginInput };

    const user = await User.findOne(query).select("+password");
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(403).json({
        message:     "Please verify your email before logging in.",
        allowResend: true,
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

    // Issue tokens
    const accessToken  = issueAccessToken(user);
    const refreshToken = await createRefreshToken(user._id, req);

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    res.json({
      message: "Login successful",
      token:   accessToken,
      user: {
        id:       user._id,
        username: user.username,
        fullName: user.fullName,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── LOGOUT ────────────────────────────────────────────────────────────────────
export const logout = async (req, res) => {
  try {
    // Delete refresh token from DB
    const rawRefresh = req.cookies?.refreshToken;
    if (rawRefresh) {
      await RefreshToken.findOneAndDelete({ token: rawRefresh });
    }
  } catch {}

  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  res.clearCookie("refreshToken", {
    httpOnly: true, secure: true, sameSite: "none",
    path: "/api/auth/refresh",
  });
  res.json({ message: "Logged out successfully." });
};

// ── REFRESH ACCESS TOKEN ──────────────────────────────────────────────────────
export const refreshAccessToken = async (req, res) => {
  try {
    const rawRefresh = req.cookies?.refreshToken;
    if (!rawRefresh)
      return res.status(401).json({ message: "No refresh token" });

    const tokenDoc = await RefreshToken.findOne({
      token:     rawRefresh,
      expiresAt: { $gt: new Date() },
    });
    if (!tokenDoc)
      return res.status(401).json({ message: "Invalid or expired refresh token" });

    const user = await User.findById(tokenDoc.userId).select("-password");
    if (!user)
      return res.status(401).json({ message: "User not found" });

    // Update lastUsed
    tokenDoc.device.lastUsed = new Date();
    await tokenDoc.save();

    const newAccessToken = issueAccessToken(user);
    setAccessCookie(res, newAccessToken);

    res.json({
      token: newAccessToken,
      user: {
        id:       user._id,
        username: user.username,
        fullName: user.fullName,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET ME ────────────────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id:       user._id,
        username: user.username,
        fullName: user.fullName,
        email:    user.email,
        role:     user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── SESSION MANAGEMENT ────────────────────────────────────────────────────────

// GET /api/auth/sessions — list all active sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await RefreshToken.find({
      userId:    req.user._id,
      expiresAt: { $gt: new Date() },
    }).select("-token"); // never expose raw token
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/auth/sessions/:id — revoke specific session
export const revokeSession = async (req, res) => {
  try {
    await RefreshToken.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user._id, // can only delete own sessions
    });
    res.json({ message: "Session revoked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/auth/sessions — revoke ALL sessions (logout everywhere)
export const revokeAllSessions = async (req, res) => {
  try {
    await RefreshToken.deleteMany({ userId: req.user._id });
    res.clearCookie("token",        { httpOnly: true, secure: true, sameSite: "none" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none", path: "/api/auth/refresh" });
    res.json({ message: "All sessions revoked. Logged out from all devices." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
