import React, { useState } from 'react';
import '../style/searchbar.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Cerca giochi..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Cerca</button>
    </form>
  );
};

export default SearchBar;
