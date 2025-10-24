const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Conectado ao Banco de Dados com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao Banco de Dados:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;