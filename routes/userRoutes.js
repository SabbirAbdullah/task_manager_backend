const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/me', getProfile);
router.put('/me', updateProfile);

module.exports = router;