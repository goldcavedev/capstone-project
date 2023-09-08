const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  gallery: [String],
  videoId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genres: [String],
  isFavorite: { // Aggiungi questo campo per memorizzare il valore di isFavorite per ogni gioco
    type: Boolean,
    default: false
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
