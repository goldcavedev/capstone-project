import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './loader';
import myLoader from '../assets/loader.gif'

function MyCarousel() {
  const [games, setGames] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Recupera i dati dei giochi dal server
    fetch('http://localhost:5020/games')
      .then(response => response.json())
      .then(data => setGames(data.slice(-3)))
      .catch(error => console.error(error));
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <>
      {!imagesLoaded && <Loader src={myLoader} />}
      <div style={{ backgroundColor: '#343a40' }}>
        <Carousel interval={3000} controls={false} indicators={false}>
          {games.map((game, index) => (
            <Carousel.Item key={index}>
              <div style={{ display: 'flex' }}>
                <img
                  src={game.image}
                  style={{ width: '50%', height: '400px' }}
                  onLoad={handleImageLoad}
                />
                <div>
                  <Carousel.Caption>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                  </Carousel.Caption>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default MyCarousel;
