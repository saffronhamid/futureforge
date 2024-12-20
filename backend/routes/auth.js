const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Route for registering a user
router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
