const Testimonial = require("../models/Testimonial");
const bcrypt = require("bcryptjs");

// 👉 GET : récupérer tous les témoignages
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 });
    res.json(testimonials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 👉 POST : créer un témoignage
exports.createTestimonial = async (req, res) => {
  try {
    const { name, email, message, secretCode } = req.body;

    if (!name || !email || !message || !secretCode) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const hashedCode = await bcrypt.hash(secretCode, 10);

    const testimonial = await Testimonial.create({
      name,
      email,
      message,
      secretCode: hashedCode,
      date: new Date(),
    });

    res.json({ message: "Témoignage enregistré", testimonial });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

