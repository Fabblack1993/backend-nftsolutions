const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 Données reçues:", { name, email, message });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_USER}>`, // ✅ Gmail-friendly
      to: process.env.MAIL_USER,
      replyTo: email, // ✅ Permet de répondre au visiteur
      subject: `📩 Nouveau message de ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    console.log("✅ Email envoyé avec succès");
    res.status(200).json({ success: true, message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("❌ Erreur SMTP:", error.response || error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'envoi du message. Vérifiez la configuration SMTP ou les identifiants Gmail.",
    });
  }
});

module.exports = router;