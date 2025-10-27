import MovieCard from './MovieCard';

export default function MovieList({ movies = [], onMovieClick }) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}
