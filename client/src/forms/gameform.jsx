import React, { useState, useRef } from 'react';
import '../style/gameform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSession } from '../middleware/ProtectedRoutes';

const GameForm = () => {
  const [gallery, setGallery] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [url, setUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState([]);
  const [galleryFields, setGalleryFields] = useState([0, 1]);
  const [title, setTitle] = useState(''); // Imposta il valore iniziale come stringa vuota
  const [description, setDescription] = useState(''); // Imposta il valore iniziale come stringa vuota
  const [image, setImage] = useState('');

  const session = useSession();


  const indieGameGenres = ['Action', 'Adventure', 'Casual', 'Card Game', 'Horror', 'Multiplayer', 'Noir', 'Pixel Art', 'Racing', 'RPG', 'Simulation', 'Sports', 'Strategy'];

  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(title, description, image);
    let isValid = true;
    let errorMessage = 'Per favore, compila i seguenti campi obbligatori:';
    if (!title || !description || !image) {
      if (!title) {
        titleRef.current.classList.add('invalid');
        errorMessage += '\n- Titolo';
      }
      if (!description) {
        descriptionRef.current.classList.add('invalid');
        errorMessage += '\n- Descrizione';
      }
      if (!image) {
        imageRef.current.classList.add('invalid');
        errorMessage += '\n- Immagine';
      }
      isValid = false;
      alert(errorMessage);
      return;
    }
    try {
      const response = await fetch('http://localhost:5020/addgames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, image, gallery, videoId, url, releaseDate, genres })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        // Ripristina lo stato iniziale del form
        setTitle('');
        setDescription('');
        setImage('');
        setGallery([]);
        setVideoId('');
        setUrl('');
        setReleaseDate('');
        setGenres([]);
        setGalleryFields([0]);
      } else {
        // Mostra il messaggio di errore fornito dal server
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleRemoveGalleryField = () => {
    // Verifica se ci sono più di due campi nella galleria
    if (galleryFields.length > 2) {
      // Rimuovi l'ultimo campo dalla galleria
      setGalleryFields(galleryFields.slice(0, -1));
    } else {
      // Mostra un messaggio di errore
      alert('Non possono esserci meno di due immagini nella galleria');
    }
  };

  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, galleryFields.length]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Titolo:</label>
        <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} required ref={titleRef} />
        <br />
        <label htmlFor="description">Descrizione:</label>
        <textarea id="description" value={description} onChange={event => setDescription(event.target.value)} required ref={descriptionRef} />
        <br />
        <label htmlFor="image">Immagine:</label>
        <input type="text" id="image" value={image} onChange={event => setImage(event.target.value)} required ref={imageRef} />
        <br />
        <div>Galleria:</div>
        {galleryFields.map((field, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              id={`gallery-${index}`}
              value={gallery[index]}
              onChange={event => {
                let newGallery = [...gallery];
                newGallery[index] = event.target.value;
                setGallery(newGallery);
              }}
            />
            <br />
          </React.Fragment>
        ))}
        <div className="gallery-buttons">
          <button type="button" onClick={handleAddGalleryField}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" onClick={handleRemoveGalleryField}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <br />
        <label htmlFor="videoId">Indirizzo ID del video:</label>
        <input type="text" id="videoId" value={videoId} onChange={event => setVideoId(event.target.value)} />
        <br />
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" value={url} onChange={event => setUrl(event.target.value)} />
        <br />
        <label htmlFor="releaseDate">Data di rilascio:</label>
        <input type="date" id="releaseDate" value={releaseDate} onChange={event => setReleaseDate(event.target.value)} />
        <br />
        <div>Generi:</div>
        <div className="genres-container">
          {indieGameGenres.map(genre => (
            <div key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={genres.includes(genre)}
                onChange={event => {
                  if (event.target.checked) {
                    setGenres([...genres, genre]);
                  } else {
                    setGenres(genres.filter(g => g !== genre));
                  }
                }}
              />
              <label>{genre}</label>
            </div>
          ))}
        </div>
        <br />
        <button type="submit">Aggiungi gioco</button>
      </form>
    </div>
  );
};

export default GameForm;
