const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');
const path = require('path');
const { router: authRouter, authenticate } = require('./routes/auth');
const { User, sequelize } = require('./db');
 
const app = express();
const port = process.env.PORT || 3000;
 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
 
// Session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
 
// CSRF
app.use(csurf());
 
// Routes
app.use('/auth', authRouter);
 
app.get('/login', (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});
 
app.get('/users', authenticate, async (req, res) => {
  const users = await User.findAll(); // Получаем всех пользователей
  res.render('users', { users }); // Передаём пользователей в шаблон
});
 
app.get('/', (req, res) => {
  res.redirect('/login');
});
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});