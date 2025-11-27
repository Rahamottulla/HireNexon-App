import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HIRENEXON_EMAIL,
      pass: process.env.HIRENEXON_APP_PASSWORD, // Gmail app password
    },
  });

  await transporter.sendMail({
    from: `"HireNexon" <${process.env.HIRENEXON_EMAIL}>`,
    to,
    subject,
    html: htmlContent,
  });
};

export default sendEmail;
