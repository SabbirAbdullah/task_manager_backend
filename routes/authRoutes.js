const express = require('express');
const { register, login, forgetPassword , refreshToken} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/forget-password', forgetPassword);
router.post('/refresh-token', refreshToken);

module.exports = router;
