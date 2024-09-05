import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';

// L'URL du serveur WebSocket
const WS_URL = 'ws://localhost:8080';

const Docker = () => {
    // État pour les numéros sélectionnés
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    // Configuration de la connexion WebSocket
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
      onOpen: () => {
        console.log('WebSocket connection established.');
      },
      share: true,
      filter: () => false,
      retryOnError: true,
      shouldReconnect: () => true,
    });

    // Fonction pour sélectionner un numéro et envoyer via WebSocket
    const selectNumber = (number) => {
        if (selectedNumbers.length < 6 && !selectedNumbers.includes(number)) {
            const updatedNumbers = [...selectedNumbers, number];
            setSelectedNumbers(updatedNumbers);

            // Envoi du numéro sélectionné via WebSocket
            sendJsonMessage({
                number,  // Le numéro sélectionné
                type: 'numberSelected',  // Type d'événement
            });
        }
    };

    return (
        <div className="App">
            <h1>Lotto Plugin</h1>
            <div className="numberButtons">
                {[...Array(50).keys()].map((_, i) => (
                    <button 
                        key={i+1} 
                        onClick={() => selectNumber(i+1)}
                        className={selectedNumbers.includes(i+1) ? 'selected' : ''}
                    >
                        {i+1}
                    </button>
                ))}
            </div>
            <div className="connection-status">
                {readyState === ReadyState.OPEN ? 'Connected' : 'Connecting...'}
            </div>
        </div>
    );
};

export default Docker;
