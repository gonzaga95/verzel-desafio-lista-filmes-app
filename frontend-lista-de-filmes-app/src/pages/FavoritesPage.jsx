import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { formatAddDate } from '../utils/formatAddDate';

const BASE_SHARE_URL = window.location.origin + '/share/';

export default function FavoritesPage() {
  const {
    favorites,
    loading,
    error,
    sharedLink,
    createShareLink,
    toggleLinkStatus,
    updateShareLinkName,
    shareLoading,
  } = useFavorites();

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [listNameInput, setListNameInput] = useState('');

  const handleCreateLink = async () => {
    if (sharedLink) {
      setShowShareOptions(true);
      return;
    }

    const success = await createShareLink(listNameInput);
    if (success) {
      setShowShareOptions(true);
      alert('Link criado com sucesso!');
    } else {
      alert('Falha ao gerar link. Tente novamente.');
    }
  };

  const handleTogglePublic = async e => {
    const isActive = e.target.checked;
    await toggleLinkStatus(isActive);
  };

  useEffect(() => {
    if (!sharedLink) return;

    const delayDebounce = setTimeout(() => {
      if (listNameInput && listNameInput !== sharedLink.listName) {
        updateShareLinkName(listNameInput);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [listNameInput, sharedLink, updateShareLinkName]);

  useEffect(() => {
    if (sharedLink && !listNameInput) {
      setListNameInput(sharedLink.listName);
    }
  }, [sharedLink]);

  const handleCopyLink = () => {
    const fullLink = `${BASE_SHARE_URL}${sharedLink.shareToken}`;
    navigator.clipboard.writeText(fullLink);
    alert('Link copiado para a área de transferência!');
  };

  if (loading) return <p>Carregando favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className="favorites-header">
        <h3>Filmes Favoritos</h3>

        <div>
          {!sharedLink && (
            <button
              className="share-toggle"
              onClick={handleCreateLink}
              disabled={shareLoading || favorites.length === 0}
            >
              <img
                src="./src/assets/images/attach-svgrepo-com.svg"
                alt="Ícone para compartilhar lista"
              />
              {shareLoading ? 'Gerando...' : 'Compartilhar'}
            </button>
          )}

          {sharedLink && (
            <button
              className="share-toggle"
              onClick={() => setShowShareOptions(prev => !prev)}
              disabled={shareLoading}
            >
              <img
                src="./src/assets/images/attach-svgrepo-com.svg"
                alt="Ícone para compartilhar lista"
              />
              {shareLoading ? 'Carregando...' : 'Compartilhar'}
            </button>
          )}
        </div>
      </div>

      {sharedLink && showShareOptions && (
        <div className="share-options">
          <div className="share-link-section">
            <input
              type="text"
              value={listNameInput}
              onChange={e => setListNameInput(e.target.value)}
              placeholder="Digite o nome"
            />
            <button onClick={handleCopyLink}>Copiar link</button>
          </div>

          <div className="label">
            <input
              id="share-active"
              type="checkbox"
              checked={sharedLink.isActive}
              onChange={handleTogglePublic}
              disabled={shareLoading}
              aria-label="Alternar status público da lista"
            />
            <p
              style={{
                color: sharedLink.isActive ? 'green' : 'red',
                margin: 0,
              }}
            >
              {sharedLink.isActive ? 'Pública e Ativa' : 'Privada e Inativa'}
            </p>
          </div>
        </div>
      )}

      {favorites.length === 0 && !loading && (
        <p>Você ainda não tem filmes favoritos.</p>
      )}

      {favorites.length > 0 && (
        <div className="favorites-list">
          <div className="favorites-list-header" aria-hidden="true">
            <span>Título</span>
            <span>Avaliação</span>
            <span>Data de adição</span>
          </div>
          {favorites.map(movie => (
            <article key={movie._id}>
              <h3>{movie.title}</h3>
              <p>⭐ {movie.rating?.toFixed(1) || 'N/A'}</p>
              <p>📆 {formatAddDate(movie.addDate)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
