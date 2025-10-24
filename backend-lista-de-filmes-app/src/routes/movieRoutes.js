const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const extractUserId = require('../middlewares/authMiddlewere');

// Rota para buscar filmes /movies/search
router.get('/search', movieController.searchMovies);

// Rota para adicionar filme aos favoritos /movies/favorites
router.post('/favorites', extractUserId, movieController.addFavoriteMovie);

// Rota para listar filmes favoritos /movies/favorites
router.get('/favorites', extractUserId, movieController.getFavoriteMovies);

// Rota para deletar filme dos favoritos /movies/favorites/:tmdb_id
router.delete('/favorites/:tmdb_id', extractUserId, movieController.deleteFavoriteMovie);

module.exports = router;