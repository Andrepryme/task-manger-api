// Loads .env values into process.env
require("dotenv").config();

// load the express library and create server instance
const express = require("express");
const app = express();

// Global middleware that converts JSON to JS object
app.use(express.json());

// Custom middleware (logging, auth, etc.)
app.use((req, res, next) => {
    console.log("A request was made");
    next();
});

// Task routes
const taskRouter = require("./routes/tasks");
app.use("/tasks", taskRouter);
// Auth routes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// App-level routes which confirms that the API alive
app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});

// Server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
