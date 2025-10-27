import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [termo, setTermo] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (termo.trim()) {
      onSearch(termo);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Digite o nome do filme"
        value={termo}
        onChange={e => setTermo(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
