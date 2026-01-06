// Loads .env values into process.env
require("dotenv").config();

// Import the app module
const app = require("./app");
// Get the port from environment variables
const PORT = process.env.PORT;
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
