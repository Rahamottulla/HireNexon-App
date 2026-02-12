// backend/server.js
import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import nodemailer from "nodemailer";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";

// continue with Google & Microsoft
import passport from "passport";
import session from "express-session";
import socialAuthRoutes from "./routes/socialAuthRoutes.js";
import "./config/passport.js"; 

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session & Passport setup
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", forgotPasswordRoutes);
app.use("/api/social", socialAuthRoutes);

// =================== Email Setup ===================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HIRENEXON_EMAIL, // store your email in .env
    pass: process.env.HIRENEXON_APP_PASSWORD, // store app password in .env
  },
});

// =================== Registration Email Route ===================
app.post("/api/send-registration-email", async (req, res) => {
  const { email, username } = req.body;

  const mailOptions = {
    from: `"HireNexon" <${process.env.HIRENEXON_EMAIL}>`,
    to: email,
    subject: "🎉 Welcome to HireNexon!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">
        <h2 style="color:#0a66c2;">Registration Successful!</h2>
        <p>Dear <b>${username}</b>,</p>
        <p>Welcome to <b>HireNexon</b>! Your account has been created successfully.</p>
        <p>Please login to start exploring your opportunities.</p>
        <a href="https://hirenexon.vercel.app/login" style="background:#0a66c2;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">Login Now</a>
        <p style="margin-top:20px;">
        If you have any questions, feel free to reply to 
        <a href="mailto:support@hirenexon.com" style="color:#0a66c2;text-decoration:none;">support@hirenexon.com</a>.
      </p>
      <p style="margin-top:20px;">Best regards,<br><strong>Team HireNexon</strong></p>
        <hr style="margin:20px 0;"/>
        <footer style="font-size:13px;color:#555;text-align:center;">
          <p>📍 HireNexon Pvt. Ltd.<br>Chandigarh, India</p>
          <p>📞 Helpline: +91 7407501936<br>✉️ support@hirenexon.com</p>
          <p>© 2025 HireNexon. All Rights Reserved.</p>
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Registration email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "❌ Error sending registration email." });
  }
});

// =================== Forgot Password Email Route ===================
app.post("/api/send-forgot-email", async (req, res) => {
  const { email, resetLink } = req.body;
  const frontendBase = "https://hirenexon.vercel.app";
  const resetUrl = `${frontendBase}/reset-password?token=${resetLink}`;

  const mailOptions = {
    from: `"HireNexon" <${process.env.HIRENEXON_EMAIL}>`,
    to: email,
    subject: "🔐 Password Reset Request",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">
        <h2 style="color:#d9534f;">Password Reset Request</h2>
        <p>We received a request to reset your HireNexon password.</p>
        <p>Click the button below to reset it:</p>
        <a href="${resetUrl}" style="background:#d9534f;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">Reset Password</a>
        <p>If you didn’t request this, please ignore this email.</p>
        <hr style="margin:20px 0;"/>
        <footer style="font-size:13px;color:#555;text-align:center;">
          <p>📍 HireNexon Pvt. Ltd.<br>Chandigarh, India</p>
          <p>📞 Helpline: +91 7407501936<br>✉️ support@hirenexon.com</p>
          <p>© 2025 HireNexon. All Rights Reserved.</p>
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Forgot password email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "❌ Error sending forgot password email." });
  }
});


// =================== Default & Error Routes ===================
app.get("/", (_req, res) => {
  res.send("✅ HireNexon Backend Running Successfully 🚀");
});

app.use((_req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "❌ Internal server error" });
});

// =================== Start Server ===================
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ HireNexon Backend running at https://hirenexon-app.onrender.com`);
      console.log(`🔑 JWT_SECRET loaded: ${process.env.JWT_SECRET ? "Yes" : "❌ Not found"}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
