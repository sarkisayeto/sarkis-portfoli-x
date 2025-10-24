const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const { postContact } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').isString().trim().notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('subject').isString().trim().notEmpty().withMessage('Le sujet est requis'),
    body('message').isString().trim().isLength({ min: 5 }).withMessage('Le message est trop court')
  ],
  validateRequest,
  postContact
);

module.exports = router;