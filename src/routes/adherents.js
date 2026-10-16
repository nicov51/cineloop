const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET adherents
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM adherent ORDER BY nom, prenom');
        res.render('adherents', { adherents: result.rows });
    }catch(error) {
        console.error(error);
        res.status(500).send('Probleme serveur');
    }
});

// GET adherent/:id
// router.get('/', (req, res) => {
//     try {
//
//     }catch(error) {
//         console.error(error);
//         res.status(500).send('Probleme serveur');
//     }
// })

module.exports = router;