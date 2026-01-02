// load the express library and loads the method that handles the routes
const express = require("express");
const router = express.Router();

// Import database functions for Tasks
const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require("../db/tasks");

// In-memory array to store tasks for PATCH and DELETE operations
// const tasks = [
//     { id: 1, title: "Learn JS", completed: false },
//     { id: 2, title: "Build API", completed: false },
//     { id: 3, title: "Deployment", completed: false }
// ];  

// Handles POST requests, and used to create data
router.post("/", async(req, res) => {
    // Validate that the request body is present
    if (!req.body) {
        return res.status(400).json({ error: "Request body is required" });
    }
    // Extract title from the request body
    const title = req.body.title;
    // Validate the title
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    // Insert the new task into the database
    try {
        const newTask = await createTask(title);
        // Send the created task as JSON
        res.status(201).json(newTask);
    } catch (error) {
        // Console error for debugging
        console.error("CREATE ERROR:", error);
        // Return a 500 error response
        res.status(500).json({ error: "Failed to create task" });
    }
});

// Handle GET requests for /tasks and sends data as JSON
router.get("/", async(req, res) => {
 // Retrieve the task from the database
    try {
        const allTasks = await getAllTasks();
        if (!allTasks) {
            return res.status(404).json({ error: "No tasks found" });
        }
        // Send the task as JSON
        res.json(allTasks);
    } catch (err) {
        // Console error for debugging
        console.error("GET ALL ERROR:", err);
        // Return a 500 error response  
        res.status(500).json({ error: "Failed to retrieve tasks" });  
    }
});

// Handle GET requests for /tasks/:id and sends data as JSON
router.get("/:id", async(req, res) => {
    // Extract the task ID from the URL parameters
    const taskId = Number(req.params.id);
    // Validate the task ID
    if (Number.isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    // Retrieve the task from the database
    try {
        const thisTask = await getTaskById(taskId);
        // If task not found, send 404 response
        if (!thisTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        // Send the task as JSON
        res.json(thisTask);
    } catch (err) {
        // Console error for debugging
        console.error("GET BY ID ERROR:", err);
        // Return a 500 error response
        res.status(500).json({ error: "Failed to retrieve task" });  
    }
});

// Handle PATCH requests for /tasks/:id to update a task
router.patch("/:id", async(req, res) => {
    // Extract the task ID from the URL parameters
    const taskId = Number(req.params.id);
    // Validate the task ID
    if (Number.isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    // Validate that at least one field is provided for update
    if (req.body) {
        if (req.body.title && req.body.completed === undefined) {  
            return res.status(400).json({ error: "Title or completed must be provided" });
        }
    } else {
        return res.status(400).json({ error: "Request body is required" });
    }
    // Extract fields to update from the request body
    const { title, completed } = req.body;
    // Update the task in the database
    try {
        const updatedTask = await updateTask(taskId, {
            title,
            completed
        });
        if (updatedTask === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        // Send the updated task as JSON
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        // Console error for debugging
        console.error("UPDATE ERROR:", err);
        // Return a 500 error response
        res.status(500).json({ error: "Failed to update task" });
    }
});

// Handle DELETE requests for /tasks/:id to delete a task
router.delete("/:id", async (req, res) => {
    // Extract the task ID from the URL parameters
    const taskId = Number(req.params.id);
    // Validate the task ID
    if (Number.isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid task ID" });
    }
    // Delete the task from the database
    try {
        const deleteThis = await deleteTask(taskId);
        // If no rows were affected, the task was not found
        if (deleteThis.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }   
        // Send a 204 No Content response        
        res.status(204).send();
    } catch (err) {
        // Console error for debugging
        console.error("DELETE ERROR:", err);
        // Return a 500 error response
        res.status(500).json({ error: "Failed to delete task" });
    }
});

// Server makes this router available to other files
module.exports = router;