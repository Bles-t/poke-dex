const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,      // Database host (e.g., localhost) from .env
    database: process.env.DB_NAME,  // Name of the database from .env
    port: process.env.DB_PORT,     // Database port
    user: process.env.DB_USER,        // Database user from .env

});

module.exports = pool;
