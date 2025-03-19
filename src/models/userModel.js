const bcrypt = require('bcryptjs');
const { queryPromise } = require('../config/database');

// Create a new user
async function createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const result = await queryPromise(SQL, [name, email, hashedPassword]);
    return result.insertId;
}

// Find user by email
async function findUserByEmail(email) {
    const SQL = 'SELECT * FROM users WHERE email = ?';
    const result = await queryPromise(SQL, [email]);  // Use queryPromise directly
    return result[0];  // Return the first user found
}

// Find user by ID
async function findUserById(id) {
    const SQL = 'SELECT * FROM users WHERE id = ?';
    const result = await queryPromise(SQL, [id]);
    return result[0];  // Returning the first user found
}

module.exports = { createUser, findUserByEmail, findUserById };