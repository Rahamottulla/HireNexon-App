//backend/utils/sendEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "HireNexon <onboarding@resend.dev>",
      to,
      reply_to: "hirenexon@gmail.com", 
      subject,
      html,
    });

    console.log("✅ Email sent via Resend");
  } catch (error) {
    console.error("❌ Resend email error:", error);
    throw error;
  }
};

export default sendEmail;

