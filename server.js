const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const testimonialRoutes = require('./routes/testimonialRoutes.js');
const contactRoutes= require('./routes/contactRoutes.js');

dotenv.config();
const app = express();

const corsOptions = {
  origin: "https://site-vitrine-iota.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Gérer les requêtes préflight manuellement
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Methods", corsOptions.methods.join(","));
    res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

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
