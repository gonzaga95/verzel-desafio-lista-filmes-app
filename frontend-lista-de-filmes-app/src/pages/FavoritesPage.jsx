import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { formatAddDate } from '../utils/formatAddDate';

const BASE_SHARE_URL = 'http://localhost:5173/share/';

export default function FavoritesPage() {
  const {
    favorites,
    loading,
    error,
    sharedLink,
    createShareLink,
    toggleLinkStatus,
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
    console.log('Toggling link status to:', isActive);
    await toggleLinkStatus(isActive);
  };

  const handleCopyLink = () => {
    const fullLink = `${BASE_SHARE_URL}${sharedLink.shareToken}`;
    navigator.clipboard.writeText(fullLink);
    alert('Link copiado para a área de transferência!');
  };

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
        <div className="share-button">
          <h4>Link de Compartilhamento</h4>

          <p className="share-button-link">
            {`${BASE_SHARE_URL}${sharedLink.shareToken}`}
          </p>

          <button className="share-button-copy-link" onClick={handleCopyLink}>
            Copiar
          </button>

          <label>
            <input
              type="checkbox"
              checked={sharedLink.isActive}
              onChange={handleTogglePublic}
              disabled={shareLoading}
            />
            Público?
          </label>
          <p
            style={{
              fontSize: 'small',
              color: sharedLink.isActive ? 'green' : 'red',
            }}
          >
            Status:{' '}
            {sharedLink.isActive ? 'Público e Ativo' : 'Privado e Inativo'}
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
