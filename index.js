require("dotenv").config();
// Loads .env into process.env

// import express from "express";
const express = require("express");
// load the Express library
// express becomes a funtion I can use
// const means the value won't change

// import taskRouter from "./routes/tasks";
const taskRouter = require("./routes/tasks");
// This gives index.js access to the taskRouter

const app = express();
// calls the express() function
// creates an application object
// app represents your server

app.use((req, res, next) => {
    console.log("A request was made");
    next();
});
// Middleware: runs before and can affect routes & controls request flow, authentication and validation

app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});
// app.get = listens for GET request
// '/' = the homepage URL
// (req, res) = Request and response objects
// res.send(...) = sends text back to the browser

const PORT = process.env.PORT;
// storing the port number
// makes it easier to change later


app.use("/tasks", taskRouter);
// This registers middleware

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// app.listen = starts the server
// PORT = where it listens 
// The function runs once when the server starts
// console.log prints confirmation