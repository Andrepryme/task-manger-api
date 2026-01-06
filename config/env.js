// Determine the current environment
const nodeEnv = process.env.NODE_ENV || 'development';

// Load environment variables from .env file in non-production environments
if (nodeEnv !== 'production') {
    require("dotenv").config();
}

// Validate required environment variables
const requiredVars = ['PORT', 'JWT_SECRET'];

// Check for missing variables
for (const key of requiredVars) {
    if (!process.env[key]) {
        console.log(`Missing required environment variable ${key}`);
        process.exit(1);
    }
}

// Export the validated environment variables
module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: nodeEnv
};