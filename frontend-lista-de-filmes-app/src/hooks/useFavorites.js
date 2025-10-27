import { useState, useEffect, useCallback } from 'react';
import { movieAppService } from '../services/movieAppService';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await movieAppService.getFavorites();
      setFavorites(data || []);
    } catch (err) {
      setError('Falha ao carregar favoritos.');
      console.error('Erro ao carregar favoritos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = async movie => {
    try {
      await movieAppService.addFavorite(movie);
      await loadFavorites();
      return true;
    } catch (err) {
      if (err?.response?.status === 409) {
        await loadFavorites();
        return true;
      }
      console.error('Erro ao adicionar favorito:', err);
      return false;
    }
  };

  const removeFavorite = async tmdbId => {
    try {
      await movieAppService.removeFavorite(tmdbId);
      await loadFavorites();
      return true;
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      return false;
    }
  };

  const isFavorite = tmdbId => {
    return favorites.some(fav => fav.tmdb_id === tmdbId);
  };

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorites,
  };
}
