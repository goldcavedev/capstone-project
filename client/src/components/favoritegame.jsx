import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/favoriteGames.css'
import { useSession } from '../middleware/ProtectedRoutes';

const FavoriteGame = ({ game, onRemoveFromFavorites }) => {

  const session = useSession();

  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:5020/users/${ session.userId}/favorites/${gameId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      onRemoveFromFavorites(gameId);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }  

  return (
    <Card className='favorite-card'>
      <Card.Body className='favorite-card-body'>
        <img src={game.image} alt={game.title} />
        <div className='scrolling-title-container'>
          <div className={` ${game.title.length > 12 ? 'favorite-game-scrolling-title' : 'favorite-game-title-container'}`}>
            <span><Link className='game-link' to={`/game-details/${game._id}`}>{game.title}</Link></span>
          </div>
        </div>
      </Card.Body>
      <Dropdown>
        <Dropdown.Toggle className='custom-toggle' variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={faEllipsisV} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => deleteGame(game._id)}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
};

export default FavoriteGame;