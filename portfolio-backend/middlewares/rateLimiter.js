const rateLimit = require('express-rate-limit');


const limiterMiddleware = rateLimit({
windowMs: 60 * 1000, // 1 minute
max: 100, // 100 requests par minute
message: { 
success: false, 
message: 'Trop de requêtes, réessaye plus tard.' 
},
standardHeaders: true,
legacyHeaders: false,
});


module.exports = limiterMiddleware;