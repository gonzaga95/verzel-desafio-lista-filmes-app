const tmdbService = require('../services/tmdbService');

async function searchMovies(req, res) {
    const {query} = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Parâmetro de busca ausente' });
    }

    try {
        const movies = await tmdbService.searchMovies(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    searchMovies,
};