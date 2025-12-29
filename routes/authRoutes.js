const express = require('express');
const { register, login, forgetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/forget-password', forgetPassword);

module.exports = router;
