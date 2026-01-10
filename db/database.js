// Import the PostGres module
const { Pool } = require("pg");

// Import database configuration from environment variables
const {
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD 
} = require("../config/env");

let pool;
// Create a new PostgreSQL connection pool
if  (NODE_ENV === "production") {
    pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false, },
    });
} else {
    pool = new Pool({
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD
    });
}

pool.on("connect", () => {
    console.log("Connected to the PostgreSQL database");
});


pool.on("error", (err) => {
    console.error("Unexpected PostGresSQL error", err);
    process.exit(-1);
});

// Export the pool for use in other modules
module.exports = { pool };