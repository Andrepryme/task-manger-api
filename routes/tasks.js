const express = require("express");


const router = express.Router();
// express.Router() creates a mini Express app
// It handles routes only
// It does NOT start a server

router.get("/", (req, res) =>{
    res.send("All Task");
});
// Respond when someone asks for task

module.exports = router;
// Makes this router available to other files
// Allow the server to plug this route in