import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = 'wss://lotto-r7aq.onrender.com'; // URL du serveur WebSocket

const Display = () => {
  const [numbers, setNumbers] = useState([]);

  // Utilisation de useWebSocket pour se connecter au serveur
  const { lastMessage } = useWebSocket(WS_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: () => true, // Essayer de se reconnecter en cas de déconnexion
  });

  useEffect(() => {
    if (lastMessage) {
      try {
        // Vérifier si le message est un objet Blob
        if (lastMessage.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = function() {
            try {
              // Convertir le contenu du Blob en texte, puis analyser le JSON
              const parsedMessage = JSON.parse(reader.result);
              if (parsedMessage.type === "numberSelected") {
                // Ajouter le nouveau nombre à la liste
                setNumbers((prevNumbers) => [...prevNumbers, parsedMessage.number]);
              }
            } catch (error) {
              console.error("Erreur lors de l'analyse du message WebSocket:", error);
            }
          };
          // Lire le Blob en tant que texte
          reader.readAsText(lastMessage.data);
        } else {
          // Si ce n'est pas un Blob, traiter le message directement
          const parsedMessage = JSON.parse(lastMessage.data);
          if (parsedMessage.type === "numberSelected") {
            setNumbers((prevNumbers) => [...prevNumbers, parsedMessage.number]);
          }
        }
      } catch (error) {
        console.error("Erreur lors du traitement du message WebSocket:", error);
      }
    }
  }, [lastMessage]);

  return (
    <div className="number-display">
      {numbers.map((num, index) => (
        <div key={index} className="number-ball">
          {num}
        </div>
      ))}
    </div>
  );
};

export default Display;
