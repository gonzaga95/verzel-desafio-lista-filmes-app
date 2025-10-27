import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import { useMoviesSearch } from '../hooks/useMoviesSearch';
import { useFavorites } from '../hooks/useFavorites';

export default function SearchPage() {
  const { movies, loading, error, searchMovies } = useMoviesSearch();
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = movie => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleAddFavorite = async movie => {
    await addFavorite(movie);
  };

  const handleRemoveFavorite = async tmdbId => {
    await removeFavorite(tmdbId);
  };

  return (
    <section>
      <p>Busque pelo nome de um filme e veja os resultados:</p>

      {favorites.length > 0 && (
        <Link to="/favoritos">
          <button>
            ⭐ {favorites.length}{' '}
            {favorites.length === 1 ? 'favorito' : 'favoritos'}
          </button>
        </Link>
      )}

      <SearchBar onSearch={searchMovies} />

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <MovieList movies={movies} onMovieClick={handleMovieClick} />

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        isFavorite={selectedMovie ? isFavorite(selectedMovie.id) : false}
      />
    </section>
  );
}
