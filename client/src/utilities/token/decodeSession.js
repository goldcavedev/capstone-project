// Importa la libreria jwt-decode
import jwt_decode from "jwt-decode"

const decodeSession = () => {
    // Recupera l'elemento session dal local storage
    const session = localStorage.getItem('session');
    // Decodifica la sessione utilizzando la libreria jwt-decode
    const decodeSession = jwt_decode(session);
    // Restituisce la sessione decodificata
    return decodeSession;
}

// Esporta la funzione decodeSession come esportazione predefinita
export default decodeSession;
