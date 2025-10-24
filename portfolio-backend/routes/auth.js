const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/', [ body('username').notEmpty(), body('password').notEmpty() ], validateRequest, login);

module.exports = router;