const express = require('express');
const {signup, signin, googleAuth} = require('../controllers/authController');
const router = express.Router();

// creating a new user
router.post('/signup', signup)

// sign in
router.post('/signin', signin)

// google authentication
router.post('/google', googleAuth)

module.exports = router;