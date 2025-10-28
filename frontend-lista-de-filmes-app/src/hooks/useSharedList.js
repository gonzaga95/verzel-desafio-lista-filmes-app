import { useState, useEffect } from 'react';
import { movieAppService } from '../services/movieAppService';

export function useSharedList(shareToken) {
  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!shareToken) {
      setError('Token de compartilhamento não fornecido.');
      setLoading(false);
      return;
    }

    async function fetchSharedList() {
      setLoading(true);
      setError('');
      try {
        const response = await movieAppService.getSharedList(shareToken);
        setListData(response.data);
      } catch (err) {
        console.error('Erro ao carregar lista compartilhada:', err);

        if (err.response?.status === 404) {
          setError(
            'A lista de filmes não foi encontrada. O link pode estar incorreto.'
          );
        } else if (err.response?.status === 403) {
          setError(
            'Esta lista está inativa e não pode ser visualizada publicamente.'
          );
        } else {
          setError('Falha ao carregar a lista compartilhada.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSharedList();
  }, [shareToken]);

  return { listData, loading, error };
}
