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





mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connecté à MongoDB');
}).catch(err => console.error(err));

app.listen(5000, () => {
  console.log('✅ Serveur backend lancé sur http://localhost:5000');
});
