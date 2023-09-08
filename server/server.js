const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const PORT = 5020;

// Importa le route
const usersRoute = require('./routes/users');
const commentsRoute = require('./routes/comments');
const gamesRoute = require('./routes/games');
const loginRoute = require('./routes/login');
const userFavorites = require('./routes/userFavorite')
// const loggedUser = require('./routes/loggeduser')

const app = express();

app.use('/uploads', express.static(path.join(__dirname,'./uploads')))


app.use(express.json());
app.use(cors());

app.use('/', usersRoute);
app.use('/', commentsRoute);
app.use('/', gamesRoute);
app.use('/', loginRoute);
app.use('/', userFavorites)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connesione al database'));
db.once('open', () => {
  console.log('Database connesso correttamente');
});

app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));
