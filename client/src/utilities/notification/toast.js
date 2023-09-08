import toast from 'react-hot-toast'; // Importa la funzione toast dal pacchetto react-hot-toast

export class Toast {
  constructor(message) {
    this.message = message; // Inizializza la proprietà message con il valore passato al costruttore
  }

  notifyError() {
    toast.error(this.message); // Utilizza la funzione toast per visualizzare un messaggio di errore
  }

  notifyMessage() {
    toast.success(this.message); // Utilizza la funzione toast per visualizzare un messaggio di successo
  }
}
