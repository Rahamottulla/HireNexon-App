// backend/controllers/forgotPasswordController.js
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// =====================
// FORGOT PASSWORD
// =====================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'HireSphere Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to email" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================
// RESET PASSWORD
// =====================
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
