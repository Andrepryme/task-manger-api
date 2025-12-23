const express = require('express');
// load the Express library
// express becomes a funtion I can use
// const means the value won't change

const app = express();
// calls the express() function
// creates an application object
// app represents your server

app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});
// app.get = listens for GET request
// '/' = the homepage URL
// (req, res) = Request and respond objects
// res.send(...) = sends text bsack to the browser

const PORT = 3000;
// storing the port number
// makes it easier to change later

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
// app.listen = starts the server
// PORT = where it listens 
// The function runs once when the server starts
// console.log prints confirmation