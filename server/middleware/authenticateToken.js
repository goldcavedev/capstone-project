const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Legge il token dall'header della richiesta
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  // Se non c'è un token, restituisce un errore
  if (!token) {
    return res.status(401).send({ message: 'Token mancante' });
  }

  // Verifica il token utilizzando il segreto del token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err)
      return res.status(403).send({ message: 'Token non valido' });
      
    }

    // Se il token è valido, allega i dati decodificati alla richiesta e chiama il prossimo middleware
req.user = payload;
next();

  });
}

module.exports = authenticateToken;