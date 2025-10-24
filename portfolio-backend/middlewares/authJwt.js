const jwt = require('jsonwebtoken');


function authJwt(req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Token manquant' });


const token = authHeader.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ success: false, message: 'Token invalide' });
}
}


module.exports = authJwt;