import { useState } from 'react';
import { movieService } from '../services/movieService';

export function useMoviesSearch() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchMovies(query) {
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      const { data } = await movieService.searchMovies(query);
      setMovies(data.results || []);
    } catch (err) {
      setError('Falha ao buscar filmes. Verifique se o backend está rodando.');
      console.error('Erro ao buscar filmes:', err);
    } finally {
      setLoading(false);
    }
  }

  return { movies, loading, error, searchMovies };
}
