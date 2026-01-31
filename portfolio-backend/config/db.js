const mongoose = require('mongoose');

async function connectDB(uri) {
	// Mongoose v6+ removes the need for useNewUrlParser/useUnifiedTopology
	// Keep defaults and let Mongoose manage driver options
	return mongoose.connect(uri);
}

module.exports = connectDB;