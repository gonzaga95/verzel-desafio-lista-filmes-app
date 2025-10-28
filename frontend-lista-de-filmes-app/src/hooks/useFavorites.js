import { useState, useEffect } from 'react';
import { movieAppService } from '../services/movieAppService';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [sharedLink, setSharedLink] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  async function loadFavorites() {
    setLoading(true);
    setError('');

    try {
      const response = await movieAppService.getFavorites();
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
  }

  async function removeFavorite(tmdbId) {
    try {
      await movieAppService.removeFavorite(tmdbId);
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

  async function loadSharedLink() {
    try {
      const response = await movieAppService.getOrCreateShareLink(
        'Minha Lista'
      );
      setSharedLink(response.data);
    } catch (err) {
      console.warn(
        'Link de compartilhamento não encontrado/criado ainda.',
        err
      );
      setSharedLink(null);
    }
  }

  async function toggleLinkStatus(isActive) {
    setShareLoading(true);
    try {
      const response = await movieAppService.toggleShareStatus(isActive);
      setSharedLink(prev => ({ ...prev, isActive: response.data.isActive }));
      return true;
    } catch (err) {
      console.error('Erro ao alternar status de compartilhamento:', err);
      return false;
    } finally {
      setShareLoading(false);
    }
  }

  async function createShareLink(listName) {
    setShareLoading(true);
    try {
      const response = await movieAppService.getOrCreateShareLink(listName);
      setSharedLink(response.data); // O backend retorna o token e status
      return true;
    } catch (err) {
      console.error('Erro ao criar link:', err);
      return false;
    } finally {
      setShareLoading(false);
    }
  }

  useEffect(() => {
    loadFavorites();
    loadSharedLink();
  }, []);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorites,
    sharedLink,
    shareLoading,
    createShareLink,
    toggleLinkStatus,
  };
}
