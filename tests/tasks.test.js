const request = require("supertest");
// Import the Express app
const app = require("../app");

// Test suite for the Task Manager API
describe("Task Manager API", () => {
    // Test to ensure that unauthenticated requests are rejected
    it("Rejects unauthenticated requests", async () => {
        // Make a request to a protected route without authentication
        const res = await request(app).get("/tasks");
        // Expect a 401 Unauthorized response
        expect(res.statusCode).toBe(401);      
    });
});