require('dotenv').config();

const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware pour parser le JSON ou les formulaires
app.use(express.json());
//extended a true pour parser les structures imbriquées
app.use(express.urlencoded({ extended: true }));

//route test
app.get('/', (req, res) => {
    res.send('le serveur fonctionne');
});

//on demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})

