// load the express library and loads the method that handles the routes
const express = require("express");
const router = express.Router();

// create a task variable for an array that temporarily holds all tasks
const tasks = [
    { id: 1, title: "Learn JS", completed: false },
    { id: 2, title: "Build API", completed: false }
];  

// Handle GET requests for /tasks and sends data as JSON
router.get("/", (req, res) => {
    // res.send("All Task");
    res.json(tasks);
});


// Handle GET requests for /tasks/:id and sends data as JSON
router.get("/:id", (req, res) => {
    // Extract the task ID from the URL parameters
    const taskId = parseInt(req.params.id);
    // Find the task with the matching ID
    const task = tasks.find(t => t.id === taskId);
    // If task not found, stop execution send 404 response
    if(!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    // Send the found task as JSON
    res.json(task);
});


// Handles POST requests, and used to create data
router.post("/", (req, res) => {
    const newTask = {
        id: Date.now(),
        // Create a simple unique ID
        title: req.body.title,
        // Contains data sent by the client
        completed: false
    };
    tasks.push(newTask);
    // Saves the task
    res.status(201).json(newTask);
    // Confirms it was created successfully
    console.log(req.body);
});

// Server makes this router available to other files
module.exports = router;