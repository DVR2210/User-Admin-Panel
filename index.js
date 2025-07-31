// Main entry point for the Node.js application
const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const path = require('path');
 
// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
 
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));
 
// Set up session management
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: false,
}));
 
// CSRF protection middleware
app.use(csurf());
 
// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
 
// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));
 
// Placeholder for routes
// app.use('/api/users', require('./routes/users'));
// app.use('/auth', require('./routes/auth'));
 
// Basic route for testing
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
