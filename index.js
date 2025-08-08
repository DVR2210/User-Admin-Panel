const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');
const path = require('path');
const { router: authRouter, authenticate } = require('./routes/auth');
const { User, sequelize } = require('./db');
const bcrypt = require('bcrypt');
 
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
const users = await User.findAll();
res.render('users', { users, csrfToken: req.csrfToken() }); // Передаём CSRF-токен
});
 
app.get('/users/add', authenticate, (req, res) => {
res.render('add-user', { csrfToken: req.csrfToken() });
});
 
app.post('/users/add', authenticate, async (req, res) => {
const { username, password, first_name, last_name, gender, birthdate } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({ username, password: hashedPassword, first_name, last_name, gender, birthdate });
res.redirect('/users');
});
 
app.get('/users/edit/:id', authenticate, async (req, res) => {
const user = await User.findByPk(req.params.id);
res.render('edit-user', { user, csrfToken: req.csrfToken() });
});
 
app.post('/users/edit/:id', authenticate, async (req, res) => {
const { id } = req.params;
const { username, password, first_name, last_name, gender, birthdate } = req.body;
const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
await User.update(
{ username, password: hashedPassword, first_name, last_name, gender, birthdate },
{ where: { id } }
);
res.redirect('/users');
});
 
app.post('/users/delete/:id', authenticate, async (req, res) => {
await User.destroy({ where: { id: req.params.id } });
res.redirect('/users');
});
 
app.get('/', (req, res) => {
res.redirect('/login');
});
 
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});