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
        res.render('reservation', {
            reservations: result.rows,
            query: req.query});
    } catch (error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});

// GET /reservations/nouvelle - Afficher le formulaire d'emprunt avec 2 select (adherents et films)
router.get('/nouvelle', async (req, res) => {
    try {
        //On recup les adherents actifs et les films dispo
        const adherents = await pool.query('SELECT * FROM adherent WHERE actif = TRUE ORDER BY nom');
        const films = await pool.query('SELECT * FROM film WHERE quantite_disponible > 0 ORDER BY titre');
        res.render('reservation-nouvelle', {
            adherents: adherents.rows,
            films: films.rows});
    } catch {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});

// POST/reservations/nouvelle - Enregistrer l'emprunt
router.post('/nouvelle', async (req, res) => {
    const { adherent_id, film_id } = req.body;

    try {
        //calcul de la date de retour J+7
        const dateRetour = await pool.query("SELECT CURRENT_DATE + INTERVAL '7 days' AS date_retour")
        const datePrevue = dateRetour.rows[0].date_retour;

        //creer la resa
        await pool.query(`INSERT INTO reservation (adherent_id, film_id, date_retour_prevue, statut) VALUES ($1, $2, $3, 'EN_COURS')`, [adherent_id, film_id, datePrevue]);

        //decrementer le stock
        await pool.query(`UPDATE film SET quantite_disponible = quantite_disponible -1 WHERE id = $1`, [film_id]);

        //rediriger vers la liste des resa
        res.redirect('/reservations?success=1');

    } catch(error) {
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
        res.redirect('/reservations?success=1');
        //
    } catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
})


module.exports = router;