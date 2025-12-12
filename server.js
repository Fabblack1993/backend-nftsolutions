const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const testimonialRoutes = require('./routes/testimonialRoutes.js');
const contactRoutes= require('./routes/contactRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/testimonials', testimonialRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Route racine pour éviter "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🚀 API backend NFT SOLUTIONS opérationnelle');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connecté à MongoDB');
}).catch(err => console.error(err));

// ✅ Port dynamique pour Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});
