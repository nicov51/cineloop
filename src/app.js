require('dotenv').config();

const express = require('express');
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
// SELECT * FROM film LIMIT 1;
app.get('/films', async (req, res) => {
    try {
       const result = await pool.query('SELECT * FROM film ORDER BY titre');
       res.render('films', { films: result.rows });
    } catch (error) {
    console.error(error);
    res.status(500).send('Probleme serveur');
    }
});
//placeholder $1 avec postgre =  ? en sql (....where id = ?)
app.get('/films/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM film WHERE id = $1', [req.params.id]);
        res.render('film-detail', { film: result.rows[0] });
    } catch {
        console.error(error)
        res.status(500).send('Probleme serveur');
    }
})

//on demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})

