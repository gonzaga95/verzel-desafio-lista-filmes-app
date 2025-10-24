const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Rota para buscar filmes /movies/search
router.get('/search', movieController.searchMovies);

// Rota para adicionar filme aos favoritos /movies/favorites
router.post('/favorites', movieController.addFavoriteMovie);

// Rota para listar filmes favoritos /movies/favorites
router.get('/favorites', movieController.getFavoriteMovies);

// Rota para deletar filme dos favoritos /movies/favorites/:tmdb_id
router.delete('/favorites/:tmdb_id', movieController.deleteFavoriteMovie);

module.exports = router;