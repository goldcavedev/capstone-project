const express = require('express');
const router = express.Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticateToken');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();


emitter.setMaxListeners(20);

// Get - Ritorna tutti gli elementi "users"
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});



// Post - Aggiunge un nuovo utente
router.post('/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Crittografa la password dell'utente
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Salva l'utente nel database con la password crittografata
    const user = new UserModel({ username, email, password: hashedPassword });
    const newUser = await user.save();

    res.status(201).send({
      message: "Nuovo utente registrato nel database",
      payload: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// patch - Modifica l'elemento, potendo selzionare la chiave specifica nel JSON (A differenza del put, che riscrive l'oggetto)
router.patch('/users/patch/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // === const id = req.params.id
  const userExist = await UserModel.findById(id); // Ricordarsi di mettere sempre "id" nel metodo

  if (!userExist) { //Se l'utente non esiste restituisci il messaggio
    return res.status(404).send({
      message: 'Utente inesistente'
    });
  }

  try {
    const userId = id;
    const dataUpdated = req.body;
    const options = { new: true }; // Mi restituisce l'oggetto aggiornato

    const result = await UserModel.findByIdAndUpdate(userId, dataUpdated, options);
    res.status(200).send({
      message: "Utente aggiornato correttamente",
      payload: result
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Delete - Elimina l'utente secondo un ID
router.delete('/users/delete/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send({
        message: 'Nessun utente con questo ID'
      });
    }

    res.status(200).send({
      message: `Utente con ID ${id} eliminato`
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Upload immagini
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/JGrottadaurea/Desktop/Servers/MyIndieList/server/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
  }
})

const upload = multer({ storage: storage });

router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {


  const url = req.protocol + '://' + req.get('host')


  try {
    const imageUrl = `${url}/uploads/${req.file.filename}`;

    // Recupera l'ID dell'utente dal token
    const userId = req.user.userId;

    // Aggiorna il valore del campo profilepicture nel database
    await UserModel.updateOne(
      { _id: userId },
      { $set: { profilepicture: imageUrl } }
    );

    res.send(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Errore interno del server' });
  }
});

module.exports = router;
