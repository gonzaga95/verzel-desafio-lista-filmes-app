import axios from 'axios';
import { getUserId } from '../utils/userIdStorage.js';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const movieAppService = {
  searchMovies: query => client.get('/movies/search', { params: { query } }),

  getFavorites: () =>
    client.get('/movies/favorites', {
      headers: { 'X-User-ID': getUserId() },
    }),

  addFavorite: movie =>
    client.post(
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
    client.delete(`/movies/favorites/${tmdbId}`, {
      headers: { 'X-User-ID': getUserId() },
    }),

  getOrCreateShareLink: listName =>
    client.post(
      '/shared-lists/create-link',
      { listName: listName },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  toggleShareStatus: isActive =>
    client.patch(
      '/shared-lists/toggle-share-status',
      { isActive: isActive },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  getSharedList: shareToken => client.get(`/shared-lists/${shareToken}`),
};

export default client;
