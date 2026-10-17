const express = require('express');
const router = express.Router();
const pool = require('../db');

//protection des routes
const { requireLogin } = require('../middleware/auth');
router.use(requireLogin);

// GET liste des adherents
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM adherent ORDER BY nom, prenom');
        res.render('adherents', { adherents: result.rows, query: req.query });
    }catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});

// GET adherent/nouveau - Afficher le formulaire pour enregistrer un nouvel adherent
router.get('/nouveau', async (req, res) => {
    res.render('adherent-nouveau');
})

// POST adherent/nouveau - Enregistrer un nouvel adherent
router.post('/nouveau', async (req, res) => {
    const { nom, prenom, email, telephone, adresse } = req.body;

    try {
        await pool.query(`
        INSERT INTO adherent (nom, prenom, email, telephone, adresse)
        VALUES ($1, $2, $3, $4, $5)
        `, [nom, prenom, email, telephone, adresse]);

        res.redirect('/adherents?success=1')
    } catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
})

// GET adherent/:id  details
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM adherent where id = $1', [req.params.id]);
        res.render('adherent-detail.ejs', { adherent: result.rows[0] });
    }catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
})

module.exports = router;