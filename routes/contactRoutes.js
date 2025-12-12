const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `📩 Nouveau message de ${name}`,
      text: message,
    });

    res.json({ success: true, message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("❌ Erreur envoi mail :", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;