// backend/controllers/controllers.js
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// REGISTER & SEND EMAIL VERIFICATION
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password,
      isVerified: false,
    });
    await newUser.save();

    // Generate JWT verification token (expires in 1 hour)
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

  const verifyUrl = `${BACKEND_URL}/api/users/verify/${token}`;


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
        </a>.
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
  <p style="color:#777;">© 2025 HireNexon. All Rights Reserved.</p>
</footer>

    </div>
  </div>
  `
);
} catch (emailErr) {
  console.error("Email send failed:", emailErr);
  return res.status(500).json({ message: "Failed to send verification email" });
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).send("Invalid verification link");

    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    // Redirect to frontend verification success page
    res.redirect(`${FRONTEND_URL}/verify-success`);

  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid or expired verification link");
  }
};

// LOGIN (skip email verification)
export const login = async (req, res) => {
  const { loginInput, password } = req.body;

  try {
    const query = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput)
      ? { email: loginInput.toLowerCase() }
      : { username: loginInput };

    const user = await User.findOne(query);
    if (!user) return res.status(400).json({ message: "User not found" });

    // =========================
    // Commented out email verification
    // =========================
    // if (!user.isVerified)
    //   return res.status(403).json({ message: "Please verify your email before logging in." });

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
    role: user.role || 'user'
  },
  token,
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
