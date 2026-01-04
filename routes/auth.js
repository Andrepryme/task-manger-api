// Loads .env values into process.env
require("dotenv").config();
// Import express to create a router
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import jsonwebtoken for token generation
const jwt = require('jsonwebtoken');
// Secret key for JWT signing (in a real application, store this securely)
const JWTsecret = process.env.JWT_SECRET;

// Import database function to create a user
const {
  createUser,
  getUserByEmail
} = require('../db/users');

// Test route to verify the auth router is working
router.get("/", async(req, res) => {
  res.send("Auth route is working");
});

// Route to handle user registration
router.post('/register', async (req, res) => {
  // Validate request body
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  // Extract email and password from the request body
  const { email, password } = req.body;
  // Basic validation for email and password
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  // Attempt to create a new user
  try {
    // Call the createUser function from the database module
    const newUser = await createUser(email, password);
    // Successful response
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    // Handle unique constraint violation for email
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ error: "Email already exists" });
    }
    // Log the error for debugging purposes
    console.error("Error registering user:", err);
    // Error response
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  // Validate request body
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  // Extract email and password from the request body
  const { email, password } = req.body;
  // Basic validation for email and password
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    // Retrieve user by email
    const thisUser = await getUserByEmail(email);
    if (!thisUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Compare provided password with stored password hash
    const passwordMatch = await bcrypt.compare(password, thisUser.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: thisUser.id, email: thisUser.email },
      JWTsecret,
      { expiresIn: '1h' }
    );
    // Successful login response
    res.json({ 
      message: "Login successful",
      user: { id: thisUser.id, email: thisUser.email },
      token
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error logging in user:", err);
    // Error response
    res.status(500).json({ error: "Failed to login user" });
  }
});

module.exports = router;
