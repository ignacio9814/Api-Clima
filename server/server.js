const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/weather', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crear esquema y modelo para las búsquedas
const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now },
});

const Search = mongoose.model('Search', searchSchema);

// Ruta para guardar una búsqueda
app.post('/api/search', async (req, res) => {
  const search = new Search(req.body);
  await search.save();
  res.status(201).send(search);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
