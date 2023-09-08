import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../style/login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);



  const setAccessToken = (value) => {
    setAccessTokenState(value);
  };

  const login = async (username, password) => {
    console.log('Valori di username e password:', username, password);
    try {
      // Invia una richiesta POST al server con le credenziali dell'utente
      const response = await fetch('http://localhost:5020/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
      });
      const data = await response.json();
      console.log('Dati ricevuti dal server:', data);
      // Se l'accesso è stato effettuato con successo, salva i token nel client
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
  
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // Imposta il valore di accessToken nello stato del componente
        setAccessToken(accessToken);
      } else {
        // Se il valore di accessToken è null, non salvare nulla nel localStorage e imposta il valore di accessToken su null
        setAccessToken(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // Reindirizza l'utente alla pagina /home
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Utilizza la funzione login
      await login(username, password);

      // Imposta il valore di isLoggedIn a true
      setIsLoggedIn(true); 
      
    } catch (error) {
      console.error(error);
      // Gestisci gli errori di accesso (ad esempio, mostrando un messaggio all'utente)
      setLoginError('Nome utente o password non validi');
    }
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {loginError && <p>{loginError}</p>}
        <label htmlFor="username">Username:</label><br />
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        /><br />
        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        /><br /><br />
        <Button onClick={handleSubmit}>Login</Button>
        <br />
        <Link to="/register">Don't you have an account yet?</Link>
      </form>
    </div>
  );
}

export default LoginForm;
