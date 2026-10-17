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

//POST /reservations/:id/retour  (enregistrer le retour du dvd et mettre stock a jour)
router.post('/:id/retour', async (req, res) => {
    const reservationId = req.params.id;

    try {
        //On recupere la reservation pour connaitre l'id du film
        const resaResult = await pool.query('SELECT film_id FROM reservation WHERE id = $1', [reservationId]);
        if (resaResult.rows.length === 0) {
            return res.status(400).send('Reservation introuvable');
        }
        const filmId = resaResult.rows[0].film_id;

        //maj de la reservation avec statut et date
        await pool.query(`
        UPDATE reservation
        Set statut = 'TERMINEE', date_retour_effective = CURRENT_DATE
        WHERE id = $1
        `, [reservationId]);

        //maj du stock pour le dvd concerné
        await pool.query(`
        UPDATE film
        SET quantite_disponible = quantite_disponible + 1
        where id = $1
        `, [filmId]);

        // redirection
        res.redirect('/reservations');
        //
    } catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
})

//put

//delete

module.exports = router;