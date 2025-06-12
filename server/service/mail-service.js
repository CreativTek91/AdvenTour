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
      to: process.env.EMAIL_USER, // or to the user's email
      subject: "Account Activation on " + process.env.API_URL,
      text: "",
      html: `<div>
          <h1>Welcome to ${process.env.API_NAME}!</h1>
          <p>To activate your account, please click the link below:</p>
          <a href="${link}">${link}</a>
          <p>If you did not create an account, please ignore this email.</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Activation email sent:", info.response);
      return { message: "Activation email sent successfully!" };
    } catch (error) {
      console.error("Error sending activation email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }
  async sendResetPasswordMail(to, link) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to, // user's email
      subject: "Password Reset Request",
      text: "",
      html: `<div>
          <h1>Password Reset Request</h1>
          <p>To reset your password, please click the link below:</p>
          <a href="${link}">${link}</a>
          <p>If you did not request a password reset, please ignore this email.</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Reset password email sent:", info.response);
      return { message: "Reset password email sent successfully!" };
    } catch (error) {
      console.error("Error sending reset password email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }
  async sendBookingConfirmationMail(to, bookingDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to, // user's email
      subject: "Booking Confirmation",
      text: "",
      html: `<div>
          <h1>Booking Confirmation</h1>
          <p>Thank you for your booking!</p>
          <p>Details:</p>
          <ul>
           ${bookingDetails.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
          <p>If you have any questions, please contact us.</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Booking confirmation email sent:", info.response);
      return { message: "Booking confirmation email sent successfully!" };
    } catch (error) {
      console.error("Error sending booking confirmation email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }
  async sendPaymentSuccessMail(to, paymentDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // to, // user's email
      subject: "Payment Successful",
      text: "",
      html: `<div>
          <h1>Payment Successful</h1>
          <p>Your payment has been successfully processed.</p>
          <p>Details:</p>
          <ul>
           ${paymentDetails.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
          <p>Thank you for your payment!</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Payment success email sent:", info.response);
      return { message: "Payment success email sent successfully!" };
    } catch (error) {
      console.error("Error sending payment success email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }
  async sendCancelBookingMail(to, cancelDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // to, // user's email
      subject: "Cancel is Successful",
      text: "",
      html: `<div>
          <h1>Cancel Successful</h1>
          <p>Your booking has been deleted.</p>
          <p>Details:</p>
          <ul>
           ${cancelDetails.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Cancel success email sent:", info.response);
      return { message: "Cancel  successfully!" };
    } catch (error) {
      console.error("Error sending cancel email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }

  async sendMail(name, to, subject, text) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // or to the user's email
      subject: `New message from ${name} via ${process.env.API_NAME} - ${subject}`,

      text: text,
      html: `<div>
          <h1>Welcome to ${process.env.API_NAME}!</h1>
          <p>We have received your message.</p>
          <p>If you did not create an account, please ignore this email.</p>
        </div>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Activation email sent:", info.response);
      return { message: "Email sent successfully!" };
    } catch (error) {
      console.error("Error sending activation email:", error);
      throw ErrorHandler.SendEmailError();
    }
  }
}export default new MailService();











