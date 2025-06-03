import nodemailer from "nodemailer";
import dotenv from "dotenv/config.js";
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });
  }
async sendActivationMail(to, link) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Account Activation on " + process.env.API_URL,
      text: "",
      html: `<div>
          <h1>Welcome to ${process.env.API_NAME}!</h1>
          <p>To activate your account, please click the link below:</p>
          <a href=${link}>${link}</a>
          <p>If you did not create an account, please ignore this email.</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Activation email sent:", info.response);
      return {message: "Activation email sent successfully!" };
    }
    catch (error) {
      console.error("Error sending activation email:", error);
    throw ErrorHandler.SendEmailError();
    }
  }
  async sendMail(to, subject, text) {
    // Implement the logic to send an email
    // This is a placeholder implementation
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    
    // Simulate sending email
    return Promise.resolve({ success: true });
  }
}export default new MailService();