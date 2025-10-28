import { api } from './api';

export const movieService = {
  searchMovies: query => api.get('/movies/search', { params: { query } }),
};
