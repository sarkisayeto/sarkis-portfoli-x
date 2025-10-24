const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Simple admin authentication using ADMIN_USER and ADMIN_PASS from env
// ADMIN_PASS should be a plain string in env in this simple setup. For production,
// envisage une collection Admin dans MongoDB ou un seed avec mot de passe hashé.


async function login(req, res) {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ success: false, message: 'username et password requis' });


const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;


if (username !== ADMIN_USER || password !== ADMIN_PASS) {
return res.status(401).json({ success: false, message: 'Identifiants invalides' });
}


const payload = { username };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
res.json({ success: true, token });
}


module.exports = { login };