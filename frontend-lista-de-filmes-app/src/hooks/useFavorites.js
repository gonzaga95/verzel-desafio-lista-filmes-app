import { useFavoriteMovies } from './useFavoritesMovies';
import { useSharedListActions } from './useSharedListActions';

export function useFavorites() {
  const movieActions = useFavoriteMovies();

  const sharedListActions = useSharedListActions();

  return {
    ...movieActions,
    ...sharedListActions,
  };
}
