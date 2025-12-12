const express = require('express');
const router = express.Router();

const { 
  getAllTestimonials, 
  createTestimonial 
} = require('../controllers/testimonialController');

// 👉 importer le modèle !
const Testimonial = require("../models/Testimonial");

// GET
router.get('/', getAllTestimonials);

// POST
router.post('/', createTestimonial);

// DELETE (corrigé)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Témoignage introuvable" });
    }

    res.json({ message: "Témoignage supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;


