// load the express library and create server instance
const express = require("express");
const app = express();

// Global middleware that converts JSON to JS object
app.use(express.json());

// Logging middleware to log each request method and URL
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`);
        next();
    });
}

// App-level routes health check
app.get('/', (req, res) => {
    return res.send('Task Manager API is running!');
});

// Task routes
app.use("/tasks", require("./routes/tasks"));
// Auth routes
app.use("/auth", require("./routes/auth"));


// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("UNHANDLED ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Export the app for use in other modules (e.g., server.js, tests)
module.exports = app;