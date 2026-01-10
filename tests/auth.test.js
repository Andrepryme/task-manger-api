const request = require("supertest");
// Import the Express app
const app = require("../app");

// Test suite for the Auth routes
describe("Auth Routes", () => {
    // Test the registration route
    it("registers and then logs in the user", async () => {
        // Define test user credentials
        const email = `test_${Date.now()}@example.com`;
        const password = "TestPassword123";

        // Register a new user
        const register = await request(app)
        .post("/auth/register")
        .send({ email, password });
        // Expect successful registration
        expect(register.statusCode).toBe(201);

        // Log in with the newly registered user
        const login = await request(app)
        .post("/auth/login")
        .send({ email, password });
        // Expect successful login
        expect(login.statusCode).toBe(200);
        expect(login.body.token).toBeDefined();
    });
});