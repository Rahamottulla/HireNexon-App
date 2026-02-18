// backend/utils/sendEmail.js
import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "HireNexon <no_reply@hirenexon.com>", 
      to,
      reply_to: "support@hirenexon.com",          
      subject,
      html,
    });

    console.log("✅ Email sent via HireNexon domain");
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

export default sendEmail;
