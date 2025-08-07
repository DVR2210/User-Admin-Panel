const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
 
// Настройка подключения к базе данных
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});
 
// Определение модели User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
}, {
  tableName: 'users',
  timestamps: false,
});
 
// Тест подключения
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));
 
// Синхронизация и создание начального пользователя
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

sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced');
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Явно вычисляем хеш
    await User.create({
      username: 'admin',
      password: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      gender: 'male',
      birthdate: '1990-01-01',
    });
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
});

module.exports = { User, sequelize };