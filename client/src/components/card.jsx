import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import Loader from '../components/loader';
import myLoader from '../assets/loader.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart as faRegularHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../style/card.css';
import { useSession } from '../middleware/ProtectedRoutes';

const MyCard = ({ game, onRemoveFromFavorites, onAddToFavorites, userFavorites, selectedGame, setSelectedGame }) => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession()

  if (!game) {
    return null;
  }

  const handleCardClick = (game) => {
    setSelectedGame(game);
    setIsLoading(true);
  };

  const handleModalClose = () => {
    setSelectedGame(null);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleButtonClick = async (event, game) => {
    event.stopPropagation(); 

    if (userFavorites.includes(game._id)) {
      onRemoveFromFavorites(game._id);
    } else {
      try {
        const userId = session.userId;
        const response = await fetch(`http://localhost:5020/users/${userId}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gameId: game._id })
        });
        if (response.ok) {
          onAddToFavorites(game._id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  console.log(setSelectedGame)

  return (
    <>
      <Card bg="dark" text="white" className="m-2 game-card" onClick={() => handleCardClick(game)}>
        <div>
          <Card.Img variant="top" src={game.image} />
        </div>
        <Card.Body className="game-card-body" onClick={() => handleCardClick(game)}>
          <div >
            <Card.Title className='card-game-title' >{game.title}</Card.Title>
          </div>
        </Card.Body>
        {userFavorites.includes(game._id) ? (
          <>
            <div className="added-to-list">
              <FontAwesomeIcon icon={faCheck} className="text-success" />
              <span >Added to your list</span>
            </div>
          </>
        ) : (
          <Button
            variant="dark"
            onClick={(event) => handleButtonClick(event, game)}
            disabled={userFavorites.includes(game._id)}
            className='heart-button'
          >
            <FontAwesomeIcon icon={faRegularHeart} />
          </Button>

        )}

      </Card>

      {selectedGame && (
        <Modal show={true} onHide={handleModalClose} dialogClassName="modal-dark">
          <Modal.Title className="modal-title">{selectedGame.title}</Modal.Title>
          <Modal.Body>
            {isLoading && <Loader src={myLoader} />}
            {selectedGame.videoId && (
              <div className="iframe-container">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${selectedGame.videoId}`}
                  title={selectedGame.title}
                  allowFullScreen
                  onLoad={handleIframeLoad}
                ></iframe>
              </div>
            )}
            <p>{selectedGame.description}</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Link to={`/game-details/${selectedGame._id}`}>
              <Button variant="dark">
                <FontAwesomeIcon icon={faInfoCircle} /> View Details
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleModalClose}>
              Torna alla lista
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default MyCard;
