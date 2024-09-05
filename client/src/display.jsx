import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://localhost:8080'; // URL du serveur WebSocket

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
                // Traiter le message reçu
                const data = lastMessage.data;

                // Si le serveur envoie des chaînes de caractères représentant des nombres
                setNumbers(prevNumbers => [...prevNumbers, data]);
            } catch (error) {
                console.error('Erreur lors du traitement du message WebSocket:', error);
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
