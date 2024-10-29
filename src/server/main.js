const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,      // Database host (e.g., localhost) from .env
    database: process.env.DB_NAME,  // Name of the database from .env
    port: process.env.DB_PORT,     // Database port
    user: process.env.DB_USER,        // Database user from .env
    password: process.env.DB_PASSWORD
});

console.log({
    host: process.env.DB_HOST,      // Database host (e.g., localhost) from .env
    database: process.env.DB_NAME,  // Name of the database from .env
    port: process.env.DB_PORT,     // Database port
    user: process.env.DB_USER,        // Database user from .env
    password: process.env.DB_PASSWORD
});
const start = async function () {
    await client.connect()
    try {
        const res = await client.query('SELECT $1::text as message', ['Hello World'])
        console.log(res.rows[0].message);
    } catch (err) {
        console.error(err)
    } finally {
        await client.end()
    }

}
start();