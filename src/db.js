const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'cineloop_user',
    password: process.env.DB_PASSWORD || 'cineloop_password',
    database: process.env.DB_NAME || 'cineloop',
})

//test de connexion
pool.query('SELECT NOW()')
  .then(() => console.log('connecté à Postgre'))
  .catch((err) => console.error('Une erreur est survenue:', err.message));

module.exports = pool;