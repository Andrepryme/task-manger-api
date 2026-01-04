// Import the sqlite3 module
const sqlite3 = require('sqlite3').verbose();
// Define the path to the SQLite database file
const path = require('path');
// Adjust the path as necessary
const dbPath = path.resolve(__dirname, 'dbvault.db');

// Create and export the database connection instance
const db = new sqlite3.Database(dbPath, (err) => {
    // Handle any connection errors
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to database.');
    }
});

// Export the database connection for use in other modules
module.exports = { db };