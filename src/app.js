require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/auth');
const filmsRouter = require('./routes/films');
const adherentsRouter = require('./routes/adherents');
const reservationsRouter = require('./routes/reservations');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

//authentification
const session = require('express-session');
app.use(session({
    secret: 'cineloop-secret-temporaire',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60  }, // 1 heure
}));

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
//les routes utilisées
app.use('/', authRouter);
app.use('/films', filmsRouter);
app.use('/adherents', adherentsRouter);
app.use('/reservations', reservationsRouter);



//on demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})

