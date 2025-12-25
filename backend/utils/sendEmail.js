//backend/utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.HIRENEXON_EMAIL,
        pass: process.env.HIRENEXON_APP_PASSWORD,
      },
      tls: {
    rejectUnauthorized: false,
  },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"HireNexon" <${process.env.HIRENEXON_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

export default sendEmail;
