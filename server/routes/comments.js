const express = require('express');
const router = express.Router();
const CommentModel = require('../models/comments');

// Get - Ritorna tutti i commenti
router.get('/comments', async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Get - Ritorna tutti i commenti del gioco specificato

router.get('/comments/:post', async (req, res) => {
  const gameId = req.params.post;
  try {
    const comments = await CommentModel.find({ post: gameId });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Post - Aggiunge un nuovo commento
router.post('/comments/new', async (req, res) => {
  const comment = new CommentModel({
    author: req.body.author,
    text: req.body.text,
    post: req.body.post
  });

  try {
    const newComment = await comment.save();
    res.status(200).send({
      message: 'Nuovo commento aggiunto al database',
      payload: newComment
    });
  } catch (error) {
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Patch - Modifica un commento esistente
router.patch('/comments/patch/:id', async (req, res) => {
  const { id } = req.params;
  const commentExist = await CommentModel.findById(id);

  if (!commentExist) {
    return res.status(404).send({ message: 'Commento inesistente' });
  }

  try {
    const commentId = id;
    const dataUpdated = req.body;
    const options = { new: true };

    const result = await CommentModel.findByIdAndUpdate(commentId, dataUpdated, options);
    res.status(200).send({
      message: 'Commento aggiornato correttamente',
      payload: result
    });
  } catch (error) {
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

// Delete - Elimina un commento in base all'ID
router.delete('/comments/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await CommentModel.findByIdAndDelete(id);

    if (!comment) {
      res.status(404).send({ message: 'Nessun commento con questo ID' });
    }

    res.status(200).send({ message: `Commento con ID ${id} eliminato` });
  } catch (error) {
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

module.exports = router;
