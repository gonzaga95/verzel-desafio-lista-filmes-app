require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const movieRoutes = require('./routes/movieRoutes');
app.use('/api/movies', movieRoutes);