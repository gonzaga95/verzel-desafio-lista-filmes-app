import { useParams, Link } from 'react-router-dom';
import { useSharedList } from '../hooks/useSharedList';

export default function SharedListPage() {
  const { shareToken } = useParams();

  const { listData, loading, error } = useSharedList(shareToken);

  if (loading) {
    return (
      <section>
        <h2>Carregando Lista Compartilhada...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Erro ao Carregar Lista</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </section>
    );
  }

  if (!listData || listData.movies.length === 0) {
    return (
      <section>
        <h2>{listData?.listName || 'Lista de Filmes'}</h2>
        <p>Esta lista está vazia ou não contém filmes.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Lista Compartilhada: {listData.listName}</h1>

      <p>Total de Filmes: {listData.movies.length}</p>

      <div>
        {listData.movies.map(movie => (
          <article key={movie._id}>
            <h3>{movie.title}</h3>
            <p>⭐ Nota: {movie.rating?.toFixed(1) || 'N/A'}</p>
          </article>
        ))}
      </div>

      {
        <Link to="/">
          <button>Voltar para a Página Inicial</button>
        </Link>
      }
    </section>
  );
}
