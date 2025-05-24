import nodemailer from "nodemailer";
import dotenv from "dotenv/config.js";
import validator from "validator";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});


const sendEmail = async (req, res) => {
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
 
 let mailOptions = {
   from: sanitizedFrom,
   to: sanitizedTo,
   subject: sanitizedSubject,
   text: sanitizedMessage,
 };
console.log("Sending email with options:", mailOptions);
 
 const info = await transporter.sendMail(mailOptions);
 res.status(200).json({ message: "Email sent successfully!"});
 
    console.log("Email sent:", info.response);

    }catch (error) {
    console.error("Error sending email catchTrans:", error);
};

}























export { sendEmail }    ;