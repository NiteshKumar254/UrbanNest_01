import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Configure transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password (not normal password)
      },
    });
    //  Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // your email (receiver)
      subject: `New Contact Form Submission: ${subject}`,
      text: `
      You have a new contact request:
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

export default router;
