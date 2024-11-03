const { Pool } = require('pg');
const express = require('express')
const app = express()


const pool = new Pool({
    host: process.env.DB_HOST,      // Database host (e.g., localhost) from .env
    database: process.env.DB_NAME,  // Name of the database from .env
    port: process.env.DB_PORT,     // Database port
    user: process.env.DB_USER,        // Database user from .env
    password: process.env.DB_PASSWORD
});


// async function initializeTable() {
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL
//       );
//     `;

//     try {
//         await pool.query(createTableQuery);
//         console.log("Table 'users' has been created or already exists.");
//     } catch (err) {
//         console.error('Error creating table:', err);
//     }
// }

// initializeTable().then(() => {
//     // App Set //
//     const PORT = process.env.PORT || 5005;

//     // Routes and other middleware setups go here

//     /** Listen * */
//     app.listen(PORT, () => {
//         console.log(`Listening on port: ${PORT}`);
//     });
// });

module.exports = pool;
