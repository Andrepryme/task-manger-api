const db = require('./database');

// Initialize the database by creating the tasks table if it doesn't exist  
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
    )
    `);