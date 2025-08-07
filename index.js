// const express = require('express');
// const session = require('express-session');
// const csurf = require('csurf');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// //const { Sequelize, DataTypes } = require('sequelize'); // Импортируем Sequelize и DataTypes
// const path = require('path');
// const { router: authRouter, authenticate } = require('./routes/auth');
// const User = require('./models/user');

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // View engine setup
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

// // Session
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
// }));

// // CSRF
// app.use(csurf());

// // Database setup
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: path.join(__dirname, 'database.sqlite'),
// });

// // Test connection
// sequelize.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch(err => console.error('Database connection error:', err));

// // Sync models
// sequelize.sync({ force: true }).then(async () => {
//   console.log('Database synced');
//   await User.create({
//     username: 'admin',
//     password: await bcrypt.hash('admin123', 10),
//     first_name: 'Admin',
//     last_name: 'User',
//     gender: 'male',
//     birthdate: '1990-01-01',
//   });
// });

// // Routes
// app.use('/auth', authRouter);

// app.get('/login', (req, res) => {
//   res.render('login', { csrfToken: req.csrfToken() });
// });

// app.get('/users', authenticate, (req, res) => {
//   res.send('Users page (protected)');
// });

// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// // Экспортируем все необходимые объекты
// module.exports = { sequelize, Sequelize, DataTypes };

const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');
const path = require('path');
const { router: authRouter, authenticate } = require('./routes/auth');
const { User, sequelize } = require('./db'); // Импортируем из db.js
 
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
 
app.get('/users', authenticate, (req, res) => {
  res.send('Users page (protected)');
});
 
app.get('/', (req, res) => {
  res.redirect('/login');
});
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 