// backend/features/auth/auth.controller.js
import User from "../user/user.model.js";
import sendEmail from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import EmailVerificationToken from "./emailVerificationToken.model.js";

const JWT_SECRET = process.env.JWT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// REGISTER & SEND EMAIL VERIFICATION
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
  if (existingUser.isVerified) {
    return res.status(400).json({ message: "User already exists. Please login." });
  }

  // ADD THIS COOL DOWN CHECK
  if (
    existingUser.lastVerificationSentAt &&
    Date.now() - existingUser.lastVerificationSentAt.getTime() < 60 * 1000
  ) {
    return res.status(429).json({
      message: "Please wait before requesting another verification email.",
    });
  }

  // If user exists but NOT verified → resend new token
  await EmailVerificationToken.deleteMany({ userId: existingUser._id });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await EmailVerificationToken.create({
    userId: existingUser._id,
    tokenHash,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });

  existingUser.lastVerificationSentAt = new Date();
  await existingUser.save();
  const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;

  await sendEmail(existingUser.email, "Verify Your HireNexon Account", `
    Click below to verify:
    <a href="${verifyUrl}">Verify Email</a>
  `);

  return res.status(200).json({
    message: "Account exists but not verified. Verification email resent.",
  });
}

    // Create new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password,
      isVerified: false,
    });
    await newUser.save();

// Generate JWT verification token (expires in 1 hour)
const rawToken = crypto.randomBytes(32).toString("hex");
const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

await EmailVerificationToken.create({
  userId: newUser._id,
  tokenHash,
  expiresAt: Date.now() + 60 * 60 * 1000,
});
newUser.lastVerificationSentAt = new Date();
await newUser.save();

const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;

   // Send verification email
   try {
await sendEmail(
  newUser.email,
  "🎉 Verify Your HireNexon Account",
  `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;background:#f5f7fa;
              padding:20px;border-radius:10px;">
    <div style="background:#ffffff;padding:25px;border:1px solid #e0e0e0;border-radius:10px;
                box-shadow:0 2px 6px rgba(0,0,0,0.05);">
      <h2 style="color:#0a66c2;text-align:center;margin-bottom:20px;">Verify Your Email </h2>

      <p style="font-size:15px;color:#333;">Dear <b>${newUser.username}</b>,</p>
      <p style="font-size:15px;color:#333;line-height:1.6;">
        Welcome to <b>HireNexon</b>! We're excited to have you on board.
        Please verify your email address by clicking the button below:
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${verifyUrl}" 
          style="display:inline-block;background:#0a66c2;color:#ffffff;padding:12px 30px;
          border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
            Verify my email address
        </a>
      </div>

      <p style="font-size:14px;color:#555;">⏰ This verification link will expire in <b>1 hour</b>.</p>
      <p style="font-size:14px;color:#555;">
        If you have any questions, feel free to contact us at 
        <a href="mailto:support@hirenexon.com" style="color:#0a66c2;text-decoration:none;">
          support@hirenexon.com
        </a>
      </p>

      <p style="margin-top:25px;font-size:14px;color:#333;">
        Best regards,<br>
        <strong>Team HireNexon</strong>
      </p>

      
      <footer style="font-size:13px;color:#555;text-align:center;margin-top:25px;">
  <hr style="margin:15px 0;border:none;border-top:1px solid #ccc;"/>

  <!-- Invisible character prevents Gmail from collapsing -->
  <div style="display:none;">&#8203;</div>

  <p>📍 <strong>HireNexon Pvt. Ltd.</strong>, Chandigarh, India</p>
  <p>📞 +91 7407501936 &nbsp; | &nbsp; ✉️ <a href="mailto:support@hirenexon.com" style="color:#0a66c2;text-decoration:none;">support@hirenexon.com</a></p>
  <p style="color:#777;">© 2026 HireNexon. All rights reserved.</p>
</footer>

    </div>
  </div>
  `
);
} catch (emailErr) {
  console.error("❌ EMAIL ERROR FULL:", emailErr);

  return res.status(500).json({
    message: "Failed to send verification email",
    error: emailErr.message || emailErr,
  });
}

    res.status(201).json({ message: "Verification email sent! Please check your inbox." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const tokenDoc = await EmailVerificationToken.findOne({
      tokenHash,
      expiresAt: { $gt: Date.now() },
    });

    if (!tokenDoc) {
      return res.status(400).send("Invalid or expired verification link");
    }

    const user = await User.findById(tokenDoc.userId);
    if (!user) {
      return res.status(400).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.deleteMany({ userId: user._id });

    res.redirect(`${FRONTEND_URL}/verify-success`);

  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid or expired verification link");
  }
};

// Resend Verification
export const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({
        message:
          "If the account exists and is not verified, a verification email has been sent.",
      });
    }

    if (user.isVerified) {
      return res.json({ message: "Email already verified." });
    }

    // Cooldown (60 sec)
    if (
      user.lastVerificationSentAt &&
      Date.now() - user.lastVerificationSentAt.getTime() < 60 * 1000
    ) {
      return res.status(429).json({
        message: "Please wait before requesting another verification email.",
      });
    }

    await EmailVerificationToken.deleteMany({ userId: user._id });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await EmailVerificationToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });
    

    user.lastVerificationSentAt = new Date();
    await user.save();

    const verifyUrl = `${BACKEND_URL}/api/auth/verify-email/${rawToken}`;

    await sendEmail(user.email, "Verify Your HireNexon Account", `
      Click below to verify:
      <a href="${verifyUrl}">Verify Email</a>
    `);

    res.json({
      message:
        "If the account exists and is not verified, a verification email has been sent.",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN 
export const login = async (req, res) => {
  const { loginInput, password } = req.body;

  try {
    const query = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput)
      ? { email: loginInput.toLowerCase() }
      : { username: loginInput };

    const user = await User.findOne(query).select("+password");
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email before logging in.",
    allowResend: true
    });

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

  res.json({
  message: "Login successful",
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role || "student",
    studentType: user.studentType,
    isCampusVerified: user.isCampusVerified,
    campusVerificationStatus: user.campusVerificationStatus,
    universityId: user.universityId,
    organizationId: user.organizationId,
  },
  token,
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

