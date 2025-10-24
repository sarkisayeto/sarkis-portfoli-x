const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const authJwt = require('../middlewares/authJwt');
const { getAllProjets, getProjetById, createProjet, updateProjet, deleteProjet } = require('../controllers/projetController');


const router = express.Router();


router.get('/', getAllProjets);
router.get('/:id', getProjetById);


// Protected routes
router.post(
'/',
authJwt,
[
body('title').isString().notEmpty(),
body('description').isString().notEmpty()
],
validateRequest,
createProjet
);


router.put('/:id', authJwt, updateProjet);
router.delete('/:id', authJwt, deleteProjet);


module.exports = router;