import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites, loading, error } = useFavorites();

  return (
    <section>
      <h2>Meus Filmes Favoritos</h2>

      <Link to="/">
        <button>← Voltar para Busca</button>
      </Link>

      {loading && <p>Carregando favoritos...</p>}
      {error && <p>{error}</p>}

      {favorites.length === 0 && !loading && (
        <p>Você ainda não tem filmes favoritos.</p>
      )}

      {favorites.length > 0 && (
        <div>
          {favorites.map(movie => (
            <article key={movie._id}>
              <h3>{movie.title}</h3>
              <p>⭐ {movie.rating}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
