import { useFavoritesMovies } from './useFavoritesMovies';
import { useSharedListActions } from './useSharedListActions';

export function useFavorites() {
  const movieActions = useFavoritesMovies();

  const sharedListActions = useSharedListActions();

  return {
    ...movieActions,
    ...sharedListActions,
  };
}
