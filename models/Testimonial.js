const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  secretCode: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
