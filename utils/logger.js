// Logs informational messages
function logInfo(message) {
    if (process.env.NODE_ENV !== "production") {
        console.log(message);
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