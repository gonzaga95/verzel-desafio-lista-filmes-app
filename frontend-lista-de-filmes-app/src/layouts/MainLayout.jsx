export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <h1>🎬 Lista de Filmes</h1>
      </header>

      <main>{children}</main>

      <footer>
        <p>Feito por Carlos E. G. Silva</p>
      </footer>
    </div>
  );
}
