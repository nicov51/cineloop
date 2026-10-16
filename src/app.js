require('dotenv').config();

const express = require('express');
const filmsRouter = require('./routes/films');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

//On sert directement les fichiers du dossier public dont le css
app.use(express.static('src/public'));

//Middleware pour parser le JSON ou les formulaires
app.use(express.json());
//extended a true pour parser les structures imbriquées
app.use(express.urlencoded({ extended: true }));

//moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

//route test
app.get('/', (req, res) => {
    res.render('accueil', { nom: 'CinéLoop', version: '2.0' });
});
//route des films
app.use('/films', filmsRouter);


//on demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})

