const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post - Gestisce le richieste di accesso degli utenti
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se la richiesta contiene un nome utente e una password validi
  if (!username || !password) {
    return res.status(400).send({ message: 'Nome utente e password richiesti' });
  }

  try {
    console.log('Accesso utente:', username);

    // Verifica le credenziali dell'utente
    const user = await UserModel.findOne({ username });
    console.log('Utente trovato:', user);
    console.log('Profile picture:', user.profilepicture); 

    if (!user) {
      console.log('Utente non trovato:', username);
      return res.status(401).send({ message: 'Nome utente non valido' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password corrispondente:', passwordMatch);

    if (!passwordMatch) {
      console.log('Password non valida:', username);
      return res.status(401).send({ message: 'Password non valida' });
    }

    console.log('Credenziali valide:', username);

    // Se l'accesso è stato effettuato con successo, genera un token di accesso
    const accessToken = jwt.sign({ userId: user._id, username: user.username, email: user.email, profilepicture: user.profilepicture, role: user.role, description: user.description }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log('Access token:', accessToken);

    // Genera un token di aggiornamento
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    console.log('Refresh token:', refreshToken);

    // Invia i token al client
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

module.exports = router;
