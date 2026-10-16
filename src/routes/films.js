const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /films - Liste de films
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM film ORDER BY titre');
        res.render('films', { films: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});
//GET /films/:id - Détail d'un film
// placeholder $1 avec postgre =  ? en sql (....where id = ?)
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM film WHERE id = $1', [req.params.id]);
        res.render('film-detail', { film: result.rows[0] });
    } catch {
        console.error(error)
        res.status(500).send('Probleme serveur');
    }
})

module.exports = router;