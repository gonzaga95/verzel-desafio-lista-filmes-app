const tmdbService = require('../services/tmdbService');
const favoriteMovieModel = require('../models/favoriteMovieModel');

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

async function addFavoriteMovie(req, res) {

    const { tmdb_id, title, rating } = req.body;
    const userId = req.userId;

    if (!tmdb_id || !title) {
        return res.status(400).json({ error: 'ID e título são obrigatórios.' });
    }

    try {
        const existingMovie = await favoriteMovieModel.findOne({ tmdb_id, userId });

        if (existingMovie) {
            return res.status(409).json({ error: 'Filme já está na lista de favoritos.' });
        }

        const newFavoriteMovie = new favoriteMovieModel({ tmdb_id, title, rating: rating || 0, userId });
        await newFavoriteMovie.save();

        res.status(201).json(newFavoriteMovie);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao adicionar filme aos favoritos" });
    }
}

async function getFavoriteMovies(req, res) {
    const userId = req.userId;

    try {
        const favoriteMovies = await favoriteMovieModel.find({ userId: userId }).sort({ addDate: -1 });
        
        res.json(favoriteMovies);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao buscar filmes favoritos" });
    }
}

async function deleteFavoriteMovie(req, res) {
    const { tmdb_id } = req.params;
    const userId = req.userId;

    if (!tmdb_id) {
        return res.status(400).json({ error: 'ID do filme é obrigatório.' });
    }

    try {
        const deletedMovie = await favoriteMovieModel.findOneAndDelete({ tmdb_id, userId });

        if (!deletedMovie) {
            return res.status(404).json({ error: 'Filme não encontrado na lista de favoritos.' });
        }

        res.json({ message: 'Filme removido dos favoritos com sucesso.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao remover filme dos favoritos" });
    }
}

module.exports = {
    searchMovies,
    addFavoriteMovie,
    getFavoriteMovies,
    deleteFavoriteMovie
};
