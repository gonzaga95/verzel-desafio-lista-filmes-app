import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import { useMoviesSearch } from '../hooks/useMoviesSearch';
import { useFavoritesMovies } from '../hooks/useFavoritesMovies';

export default function SearchPage() {
  const { movies, loading, error, searchMovies } = useMoviesSearch();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesMovies();

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
    <div>
      <section>
        <p>
          Que tal montar sua lista de filmes e compartilhar com seus amigos?
        </p>
        <p>Comece buscando um filme pelo nome:</p>

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
    </div>
  );
}
