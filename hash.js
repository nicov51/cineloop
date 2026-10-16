const bcrypt = require("bcrypt");
// admin-Email:  admin@cineloop.fr
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log(hash);