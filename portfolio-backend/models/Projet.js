const mongoose = require('mongoose');


const ProjetSchema = new mongoose.Schema({
title: { type: String, required: true, trim: true },
description: { type: String, required: true },
technologies: { type: [String], default: [] },
githubUrl: { type: String, default: null },
liveDemoUrl: { type: String, default: null },
coverImage: { type: String, default: null } // url / path
}, {
timestamps: true
});


module.exports = mongoose.model('Projet', ProjetSchema);