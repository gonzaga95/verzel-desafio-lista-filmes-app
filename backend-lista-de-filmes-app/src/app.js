require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
