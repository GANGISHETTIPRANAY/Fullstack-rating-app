const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');

// Register
router.post('/register', [
  body('name').isLength({ min: 20, max: 60 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 16 })
    .matches(/[A-Z]/).withMessage('Must contain uppercase')
    .matches(/[^A-Za-z0-9]/).withMessage('Must contain special char'),
  body('address').isLength({ max: 400 }),
], register);

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
], login);

module.exports = router;
