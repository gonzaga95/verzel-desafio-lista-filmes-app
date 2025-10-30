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

  console.log('Link base:', BASE_SHARE_URL);
  console.log('Link Compartilhado:', sharedLink);

  if (loading) return <p>Carregando favoritos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Meus Filmes Favoritos</h2>

      <Link to="/">
        <button>← Voltar para Busca</button>
      </Link>

      <div>
        {!sharedLink && (
          <button
            onClick={handleCreateLink}
            disabled={shareLoading || favorites.length === 0}
          >
            {shareLoading ? 'Gerando...' : 'Gerar Link para Lista'}
          </button>
        )}

        {sharedLink && (
          <button
            onClick={() => setShowShareOptions(prev => !prev)}
            disabled={shareLoading}
          >
            {shareLoading ? 'Carregando...' : 'Compartilhar Lista'}
          </button>
        )}
      </div>

      {sharedLink && showShareOptions && (
        <div className="share-options">
          <h4>Link da sua lista</h4>

          <p className="share-link">
            {`${BASE_SHARE_URL}${sharedLink.shareToken}`}
          </p>

          <button onClick={handleCopyLink}>Copiar</button>

          <div>
            <label>Nome da Lista:</label>
            <input
              type="text"
              value={listNameInput}
              onChange={e => setListNameInput(e.target.value)}
              placeholder="Digite o nome"
            />
          </div>

          <label>
            <input
              type="checkbox"
              checked={sharedLink.isActive}
              onChange={handleTogglePublic}
              disabled={shareLoading}
            />
            Lista pública
          </label>

          <p style={{ color: sharedLink.isActive ? 'green' : 'red' }}>
            {sharedLink.isActive ? 'Pública e Ativa' : 'Privada e Inativa'}
          </p>
        </div>
      )}

      {favorites.length === 0 && !loading && (
        <p>Você ainda não tem filmes favoritos.</p>
      )}

      {favorites.length > 0 && (
        <div>
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
