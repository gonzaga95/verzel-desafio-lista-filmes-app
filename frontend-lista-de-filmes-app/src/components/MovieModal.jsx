import { useEffect, useState } from 'react';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieModal({
  movie,
  isOpen,
  onClose,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average?.toFixed(1) ?? '—';

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      onRemoveFavorite(movie.id);
    } else {
      onAddFavorite(movie);
    }
  };

  return (
    <div className="movie-modal" onClick={onClose}>
      <article onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>✕ Fechar</button>

        <section>
          {poster && <img src={poster} alt={movie.title} />}

          <div>
            <h2>{movie.title}</h2>
            <p>
              📅 {year} • ⭐ {rating}
            </p>
            <p>{movie.overview || 'Sem sinopse disponível.'}</p>

            <button
              onClick={handleFavoriteToggle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {isFavorite
                ? hover
                  ? '- Remover dos Favoritos'
                  : 'Filme favorito'
                : '+ Adicionar aos Favoritos'}
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}
