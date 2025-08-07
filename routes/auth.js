// Authentication routes
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const User = require('../models/user');
const { User } = require('../db')
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'your-jwt-secret', { expiresIn: '1h' });
    req.session.token = token; // Store token in session

    res.redirect('/users');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, 'your-jwt-secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/login');
  }
};


module.exports = { router, authenticate };