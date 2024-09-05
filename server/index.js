const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuration de CORS
app.use(cors());

// Servir les fichiers statiques (si nécessaire)
app.use(express.static(path.join(__dirname, '../client/dist')));

wss.on('connection', (ws) => {
    console.log('Un utilisateur s\'est connecté.');

    // Réception des numéros sélectionnés par le client
    ws.on('message', (message) => {
        console.log(`Numéro reçu : ${message}`);
        
        // Envoyer ce numéro à tous les clients connectés
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Gestion de la déconnexion
    ws.on('close', () => {
        console.log('Un utilisateur s\'est déconnecté.');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Le serveur WebSocket fonctionne sur http://localhost:${PORT}`);
});

// Route pour gérer les requêtes côté client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
