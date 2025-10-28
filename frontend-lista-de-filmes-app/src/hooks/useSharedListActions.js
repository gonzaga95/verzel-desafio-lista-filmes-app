import { useState, useEffect } from 'react';
import { sharedListService } from '../services/sharedListService';

export function useSharedListActions() {
  const [sharedLink, setSharedLink] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);

  async function loadSharedLink() {
    try {
      const response = await sharedListService.getOrCreateShareLink(
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
      const response = await sharedListService.toggleShareStatus(isActive);
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
      const response = await sharedListService.getOrCreateShareLink(listName);
      setSharedLink(response.data);
      return true;
    } catch (err) {
      console.error('Erro ao criar link:', err);
      return false;
    } finally {
      setShareLoading(false);
    }
  }

  async function updateShareLinkName(listName) {
    setShareLoading(true);
    try {
      const response = await sharedListService.updateSharedListName(listName);
      setSharedLink(prev => ({ ...prev, listName: response.data.listName }));
      return true;
    } catch (err) {
      console.error('Erro ao atualizar nome da lista:', err);
      return false;
    } finally {
      setShareLoading(false);
    }
  }

  useEffect(() => {
    loadSharedLink();
  }, []);

  return {
    sharedLink,
    shareLoading,
    createShareLink,
    toggleLinkStatus,
    updateShareLinkName,
  };
}
