import { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';

export function useFavoritesMovies() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadFavorites() {
    setLoading(true);
    setError('');

    try {
      const response = await favoritesService.getFavorites();
      setFavorites(response.data || []);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
      setError('Falha ao carregar favoritos.');
    } finally {
      setLoading(false);
    }
  }

  async function addFavorite(movie) {
    try {
      await favoritesService.addFavorite(movie);
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
  }

  async function removeFavorite(tmdbId) {
    try {
      await favoritesService.removeFavorite(tmdbId);
      await loadFavorites();
      return true;
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      return false;
    }
  }

  function isFavorite(tmdbId) {
    return favorites.some(fav => fav.tmdb_id === tmdbId);
  }

  useEffect(() => {
    loadFavorites();
  }, []);

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
