import { api } from './api';
import { getUserId } from '../utils/userUtils';

export const favoritesService = {
  getFavorites: () =>
    api.get('/movies/favorites', {
      headers: { 'X-User-ID': getUserId() },
    }),

  addFavorite: movie =>
    api.post(
      '/movies/favorites',
      {
        tmdb_id: movie.id,
        title: movie.title,
        rating: movie.vote_average || 0,
      },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  removeFavorite: tmdbId =>
    api.delete(`/movies/favorites/${tmdbId}`, {
      headers: { 'X-User-ID': getUserId() },
    }),
};
