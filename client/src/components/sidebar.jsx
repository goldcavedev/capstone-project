import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../style/sidebar.css';
import FavoriteGame from './favoritegame';


const FavoriteBar = ({ games = [], userFavorites = [], onRemoveFromFavorites }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleRemoveFromFavorites = (gameId) => {
    onRemoveFromFavorites(gameId);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const favoriteGames = games.filter((game) => userFavorites.includes(game._id));

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ backgroundColor: '#171717', color: 'white' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#171717',
        }}
      >
        <h4 className="sidebar-title">Lista dei preferiti</h4>
        <Button variant="dark" className="sidebar-collapse-button" onClick={handleToggleCollapse}>
          <FontAwesomeIcon icon={isCollapsed ? faChevronUp : faChevronDown} />
        </Button>
      </div>
      {!isCollapsed && (
        <>
          {favoriteGames.map((game) => (
            <FavoriteGame key={game._id} game={game} onRemoveFromFavorites={handleRemoveFromFavorites} />
          ))}
        </>
      )}
    </div>
  );
};

export default FavoriteBar;
