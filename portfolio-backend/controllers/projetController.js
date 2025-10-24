const Projet = require('../models/Projet');


// GET /api/projets
async function getAllProjets(req, res, next) {
try {
const { page = 1, limit = 20 } = req.query;
const skip = (Number(page) - 1) * Number(limit);
const projets = await Projet.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
const total = await Projet.countDocuments();
res.json({ success: true, data: projets, meta: { total, page: Number(page), limit: Number(limit) } });
} catch (err) { next(err); }
}


// GET /api/projets/:id
async function getProjetById(req, res, next) {
try {
const projet = await Projet.findById(req.params.id);
if (!projet) return res.status(404).json({ success: false, message: 'Projet non trouvé' });
res.json({ success: true, data: projet });
} catch (err) { next(err); }
}


// POST /api/projets (protected)
async function createProjet(req, res, next) {
try {
const { title, description, technologies, githubUrl, liveDemoUrl, coverImage } = req.body;
const projet = await Projet.create({ title, description, technologies, githubUrl, liveDemoUrl, coverImage });
res.status(201).json({ success: true, data: projet });
} catch (err) { next(err); }
}


// PUT /api/projets/:id (protected)
async function updateProjet(req, res, next) {
try {
const projet = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!projet) return res.status(404).json({ success: false, message: 'Projet non trouvé' });
res.json({ success: true, data: projet });
} catch (err) { next(err); }
}


// DELETE /api/projets/:id (protected)
async function deleteProjet(req, res, next) {
try {
const projet = await Projet.findByIdAndDelete(req.params.id);
if (!projet) return res.status(404).json({ success: false, message: 'Projet non trouvé' });
res.json({ success: true, message: 'Projet supprimé' });
} catch (err) { next(err); }
}


module.exports = { getAllProjets, getProjetById, createProjet, updateProjet, deleteProjet };