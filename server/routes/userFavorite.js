const express = require('express');
const router = express.Router();
const UserModel = require('../models/users')

router.get('/users/:userId/favorites', async (req, res) => {
  try {
    const userId = req.params.userId; // Extract the "userId" parameter from the URL

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // Send the user's favorites as a response
    res.status(200).send({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the user\'s favorites' });
  }
});


router.post('/users/:userId/favorites', async (req, res) => {
  try {
    const userId = req.params.userId; // Estrai il parametro "userId" dall'URL
    const gameId = req.body.gameId;

    // Trova l'utente in base all'ID
    const user = await UserModel.findById(userId);

    // Aggiungi l'ID del gioco all'array dei preferiti dell'utente
    user.favorites.push(gameId);

    // Salva le modifiche al modello dell'utente
    await user.save();

    res.status(200).send({ message: 'Game added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while adding the game to the favorites list' });
  }
});

router.delete('/users/:userId/favorites/:gameId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;

    // Trova l'utente in base all'ID
    const user = await UserModel.findById(userId);

    console.log('Favorites before:', user.favorites);

    // Rimuovi l'ID del gioco dall'array dei preferiti dell'utente
    user.favorites = user.favorites.filter(favorite => !favorite.equals(gameId));

    console.log('Favorites after:', user.favorites);

    // Salva le modifiche al modello dell'utente
    await user.save();

    res.status(200).send({ message: 'Game removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while removing the game from the favorites list' });
  }
});


module.exports = router;
        