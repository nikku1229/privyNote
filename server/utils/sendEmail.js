import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL,
      subject,
      html,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.error("Send email error:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
