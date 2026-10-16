const express = require('express');
const router = express.Router();

const ADMIN_EMAIL = 'admin@cineloop.fr';
const ADMIN_PASSWORD = 'admin123';

//affiche le formulaire de login
router.get('/login', (req, res) => {
    res.render('login');
})

//verif des identifiants et si ok on stocke userId dans la session + acces a /films
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        req.session.userId = 1;
        return res.redirect('/films');
    }
    res.render('login', { error: 'Email ou mot de pass incorrect'});
})

//deconnexion, on detruit la session et redirige vers /login
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
})

module.exports = router;