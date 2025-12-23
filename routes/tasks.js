// import express from "express";
const express = require("express");
// loads express because the router will use it

const router = express.Router();
// loads express.Router()
// It handles routes only
// It does NOT start a server

router.get("/", (req, res) =>{
    res.send("All Task");
});
// Respond when someone asks for task

module.exports = router;
// Makes this router available to other files
// Allow the server to plug this route in