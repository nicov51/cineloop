const express = require('express');
const router = express.Router();
const pool = require('../db');

//get
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
              r.id,
              r.date_emprunt,
              r.date_retour_prevue,
              r.date_retour_effective,
              r.statut,
              a.nom AS nom_adherent,
              a.prenom AS prenom_adherent,
              f.titre AS titre_film
            FROM reservation r
            JOIN adherent a ON r.adherent_id = a.id
            JOIN film f ON r.film_id = f.id
            ORDER BY r.date_emprunt DESC
            `);
        res.render('reservation', {reservations: result.rows});
    } catch (error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});

//put

//delete

module.exports = router;