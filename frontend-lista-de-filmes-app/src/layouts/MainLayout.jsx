import { Link, useLocation } from 'react-router-dom';

export default function MainLayout({ children }) {
  const location = useLocation();
  const isSearchPage = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favoritos';
  const isSharePage = location.pathname.startsWith('/share/');

  return (
    <div className="main-layout">
      <header>
        <h1>Lista de Filmes</h1>
        <nav>
          {isSearchPage && (
            <Link to="/favoritos">
              <img
                src="./src/assets/images/bookmark-svgrepo-com.svg"
                alt="Ícone para ir à página de favoritos"
              />
              Favoritos
            </Link>
          )}
          {isFavoritesPage && (
            <Link to="/">
              <img
                src="./src/assets/images/search-svgrepo-com.svg"
                alt="Ícone para ir à página de busca"
              />
              Buscar filmes
            </Link>
          )}
          {isSharePage && (
            <Link to="/">
              <img
                src="./src/assets/images/explore-svgrepo-com.svg"
                alt="Ícone para elaborar sua lista"
              />
              Faça sua lista
            </Link>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>Feito por Carlos E. G. Silva</p>
      </footer>
    </div>
  );
}
