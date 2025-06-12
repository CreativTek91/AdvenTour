import nodemailer from "nodemailer";
import validator from "validator";
import dotenv from "dotenv/config";
import mailService from '../service/mail-service.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
});


export const sendEmail = async (req, res,next) => {
  try {
  const {name,to,from,subject,message} = req.body;
  if (!from || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!from.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  const sanitizedName = validator.escape(name);
   const sanitizedTo = validator.escape(to);
      const sanitizedFrom = validator.escape(from);
  const sanitizedSubject = validator.escape(subject);
  const sanitizedMessage = validator.escape(message);
 
  if (!validator.isEmail(sanitizedTo)) {
    return res.status(400).json({ error: "Invalid recipient email address" });
  }

  await mailService.sendMail(name,sanitizedTo, sanitizedSubject, sanitizedMessage);

    }catch (error) {
    next(error);
};

}






















