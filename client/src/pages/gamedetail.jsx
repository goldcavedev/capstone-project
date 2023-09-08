import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Badge } from 'react-bootstrap'; // Importa i componenti Carousel e Badge
import Comments from '../components/comments';
import MyNavBar from '../components/navbar';
import '../style/gamedetails.css';


const GameDetails = () => {
  const [game, setGame] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`http://localhost:5020/games/${_id}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGame();
  }, [_id]);


  if (!game) {
    return <div className="not-found">Game not found</div>;
  }

  return (
    <div className="game-details">
      <MyNavBar />
      <div className="image-container">
        <img src={game.image} alt={game.title} />
        <div className="image-overlay">
          <h2>{game.title}</h2>
          {(game.gallery || game.videoId) && (
            <Carousel>
              {game.videoId && (
                <Carousel.Item>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${game.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Carousel.Item>
              )}
              {game.gallery &&
                game.gallery.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      style={{ width: '560px', height: '315px' }}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          )}
        </div>
      </div>
      <div className='games-info mx-auto text-center'>
        <p className="description">{game.description}</p>
        {game.releaseDate && (
          <p className="release-date">Data di rilascio: {game.releaseDate.split('T')[0]}</p>
        )}
        {game.genres && (
          <div className="d-flex justify-content-center">
            <ul className="genres list-inline">
              {game.genres.map((genre, index) => (
                <li key={index} className="list-inline-item">
                  <Badge bg="secondary">{genre}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Comments gameId={game._id} />
    </div>
  );
};

export default GameDetails;
