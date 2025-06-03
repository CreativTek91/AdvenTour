import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
  // service: "gmail",
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASS,
  // }
});


export const sendEmailToAdvenTour = async (req, res) => {
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
      const sanitizedFrom = validator.escape(email);
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






















