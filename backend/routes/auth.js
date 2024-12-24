const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Import the registerUser and loginUser functions from the authController

const router = express.Router();

// Route for user registration
// Handles POST requests to /api/auth/register
router.post('/register', registerUser);

// Route for user login
// Handles POST requests to /api/auth/login
router.post('/login', loginUser);

module.exports = router; // Export the router so it can be used in server.js
