import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import MyCard from '../components/card';
import MyNavBar from '../components/navbar';
import FavoriteBar from '../components/sidebar';
import { useSession } from '../middleware/ProtectedRoutes';
import '../style/searchpage.css'

const GameList = () => {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const session = useSession();


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Invia una richiesta al server per ottenere l'array dei preferiti dell'utente
        const userId = session.userId;
        const response = await fetch(`http://localhost:5020/users/${userId}/favorites`);
        const data = await response.json();

        // Memorizza l'array dei preferiti nello stato del componente
        setUserFavorites(data.favorites);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllGames = async () => {
      try {
        // Invia una richiesta al server per ottenere tutti i giochi
        const response = await fetch(`http://localhost:5020/games`);
        const data = await response.json();
        setAllGames(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
    fetchAllGames();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5020/search?q=${query}`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = async (gameId) => {
    try {
      // Invia una richiesta al server per aggiungere il gioco ai preferiti dell'utente
      const userId = session.userId;
      await fetch(`http://localhost:5020/users/${userId}/favorites/${gameId}`, { method: 'POST' });

      // Aggiorna l'elenco dei giochi preferiti
      setUserFavorites(favorites => [...favorites, gameId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromFavorites = async (gameId) => {
    try {
      // Invia una richiesta al server per rimuovere il gioco dai preferiti dell'utente
      const userId = session.userId;
      await fetch(`http://localhost:5020/users/${userId}/favorites/${gameId}`, { method: 'DELETE' });

      // Aggiorna l'elenco dei giochi preferiti
      setUserFavorites(favorites => favorites.filter(id => id !== gameId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MyNavBar />
      <div className='searchbar-container' >
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="card-container">
        {games && games.map((game) => (
          <div className="card-searched" key={game._id}>
            <MyCard
              game={game}
              userFavorites={userFavorites}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              setSelectedGame={setSelectedGame} // <-- change this line
              selectedGame={selectedGame} // <-- to this line
            />
          </div>
        ))}
      </div>
      <FavoriteBar
        games={allGames}
        userFavorites={userFavorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        setGames={setAllGames}
      />
    </>
  );
};

export default GameList;

