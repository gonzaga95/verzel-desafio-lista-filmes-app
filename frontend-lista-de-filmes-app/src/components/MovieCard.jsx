const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

export default function MovieCard({ movie, onClick }) {
  const poster = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : 'Sem imagem';

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average?.toFixed(1) ?? '—';

  return (
    <article className="movie-card" onClick={() => onClick(movie)}>
      <img src={poster} alt={movie.title} />
      <div>
        <strong>{movie.title}</strong>
        <p>
          {year} • ⭐ {rating}
        </p>
      </div>
    </article>
  );
}
