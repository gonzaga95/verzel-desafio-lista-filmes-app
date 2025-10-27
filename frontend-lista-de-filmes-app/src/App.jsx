import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
