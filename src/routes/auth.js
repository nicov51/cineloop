const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require("../db");

//const ADMIN_EMAIL = 'admin@cineloop.fr';
//const ADMIN_PASSWORD = 'admin123';

//affiche le formulaire de login
router.get('/login', (req, res) => {
    res.render('login');
})

//verif des identifiants
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Chercher l'admin par email
        const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
        const admin = result.rows[0];

        // 2. Si aucun admin trouvé, erreur
        if (!admin) {
            return res.render('login', { error: 'Email ou mot de passe incorrect' });
        }

        // 3. Comparer le mot de passe avec le hash
        const passwordOk = await bcrypt.compare(password, admin.mot_de_passe);

        if (!passwordOk) {
            return res.render('login', { error: 'Email ou mot de passe incorrect' });
        }

        // 4. Connexion réussie
        req.session.userId = admin.id;
        res.redirect('/films');

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

//deconnexion, on detruit la session et redirige vers /login
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
})

module.exports = router;