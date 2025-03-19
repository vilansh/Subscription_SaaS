require('dotenv').config();
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify queries for async/await usage
function queryPromise(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

console.log("✅ Database pool created successfully");

// ✅ Export `pool` and `queryPromise` correctly (ONLY ONCE)
module.exports = { pool, queryPromise };
