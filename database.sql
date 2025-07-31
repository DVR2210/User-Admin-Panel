-- reate users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT CHECK(gender IN ('male', 'female', 'other')) NOT NULL,
  birthdate DATE NOT NULL
);
 
-- Insert test data
INSERT INTO users (username, password, first_name, last_name, gender, birthdate) VALUES
('admin', '$2b$10$examplehash1234567890', 'Admin', 'User', 'male', '1990-01-01'),
('john_doe', '$2b$10$examplehash1234567891', 'John', 'Doe', 'male', '1985-05-15'),
('jane_smith', '$2b$10$examplehash1234567892', 'Jane', 'Smith', 'female', '1992-08-20'),
('alex_wilson', '$2b$10$examplehash1234567893', 'Alex', 'Wilson', 'other', '1995-03-10'),
('mary_jones', '$2b$10$examplehash1234567894', 'Mary', 'Jones', 'female', '1988-11-30'),
('bob_brown', '$2b$10$examplehash1234567895', 'Bob', 'Brown', 'male', '1993-07-22');