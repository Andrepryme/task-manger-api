// Utility module for logging messages
const { NODE_ENV } = require("../config/env");

// Logs informational messages
function logInfo(message) {
    if (NODE_ENV !== "production") {
        console.log(`INFO: ${message}`);
    }
}
// Logs error messages
function logError(message, error) {
        console.error(message, error);
}

// Export the logging functions
module.exports = {
    logInfo,
    logError
};