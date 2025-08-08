# User Admin Panel

## Description  
This project is a web-based admin panel built with Node.js and Express, designed for managing user accounts. It utilizes SQLite as the database, with Sequelize as the ORM, and EJS for rendering views. The panel allows administrators to perform CRUD (Create, Read, Update, Delete) operations on user data, with features including secure authentication, pagination, and basic input validation.

## Features  
- Secure Authentication: Login with JWT and password hashing using bcrypt.  
- CRUD Operations: Create, read, update, and delete user accounts.  
- Pagination: Display users in chunks of 5 per page for efficient navigation.  
- Security: CSRF protection for forms and input validation.  
- Responsive Interface: Simple, user-friendly design with EJS templates.  

## Installation  
1. Clone the repository:  
   git clone https://github.com/DVR2210/User-Admin-Panel.git  

2. Navigate to the project directory:  
   cd User-Admin-Panel  

3. Install dependencies:  
   npm install  

4. (Optional) Set environment variables:  
   Create .env file with:

 SESSION_SECRET=your-secure-session-secret
JWT_SECRET=your-secure-jwt-secret

## Usage  
1. Start server: npm start  
2. Access http://localhost:3000  
3. Login with:  
- Username: admin  
- Password: admin123  
4. Manage users via /users page  

## Notes  
- SQLite used for development (consider PostgreSQL/MySQL for production)  
- Database sync uses force: true (disable in production)  

## Contact  
Maintainer: [DVR2210](https://github.com/DVR2210)