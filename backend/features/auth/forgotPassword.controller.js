// backend/features/auth/forgotPassword.controller.js
import User from "../user/user.model.js";
import sendEmail from "../../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
   if (!user) {
  return res.status(200).json({
    message: "If this email is registered, you will receive a reset link.",
  });
}

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Create reset link
    const resetLink = `https://hirenexon.com/reset-password?token=${token}`;
    
  await sendEmail(
    user.email,
    "🔐 Reset Your HireNexon Password",
    `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;background:#f5f7fa;
                padding:20px;border-radius:10px;">
      <div style="background:#ffffff;padding:25px;border:1px solid #e0e0e0;border-radius:10px;
                  box-shadow:0 2px 6px rgba(0,0,0,0.05);">

        <h2 style="color:#d9534f;text-align:center;margin-bottom:20px;">
          Reset Your Password 🔐
        </h2>

        <p style="font-size:15px;color:#333;">Dear <b>${user.username}</b>,</p>

        <p style="font-size:15px;color:#333;line-height:1.6;">
          We received a request to reset your <b>HireNexon</b> account password.
          Click the button below to set a new password:
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="${resetLink}" 
            style="display:inline-block;background:#d9534f;color:#ffffff;
                   padding:12px 30px;border-radius:8px;
                   text-decoration:none;font-weight:bold;font-size:15px;">
              Reset My Password
          </a>
        </div>

        <p style="font-size:14px;color:#555;">
          ⏰ This reset link will expire in <b>1 hour</b>.
        </p>

        <p style="font-size:14px;color:#555;">
          If you did not request this, please ignore this email.
          Your password will remain unchanged.
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
          <p>
            📞 +91 7407501936 &nbsp; | &nbsp;
            ✉️ <a href="mailto:support@hirenexon.com"
                  style="color:#0a66c2;text-decoration:none;">
                  support@hirenexon.com
               </a>
          </p>
          <p style="color:#777;">© 2026 HireNexon. All rights reserved.</p>
        </footer>

      </div>
    </div>
    `
  );

  return res.status(200).json({
  message: "If this email is registered, you will receive a reset link.",
});

} catch (error) {
    console.error("❌ Forgot Password Error:", error);
    return res.status(500).json({
      message: "Something went wrong while sending reset email",
  });
}
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ _id: decoded.id }, { password: hashedPassword });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


