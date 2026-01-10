const request = require("supertest");
// Import the Express app
const app = require("../app");

describe("Tasks", () => {
    let token;
    beforeAll(async () => {

        // Define test user credentials
        const email = `test_${Date.now()}@example.com`;
        const password = "TestPassword123";

        // Register a new user
        await request(app)
        .post("/auth/register")
        .send({ email, password });

        // Log in with the newly registered user
        const res = await request(app)
        .post("/auth/login")
        .send({ email, password });
        token = res.body.token;
    });

    it("creates a task", async () => {
        const res = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "Test Task" });

        expect(res.statusCode).toBe(201);
    })

    it("gets tasks", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(Array.isArray(res.body)).toBe(true);
    });
    
    it("rejects unauthenticated requests", async () => {
        const res = await request(app)
        .get("/tasks");
        expect(res.statusCode).toBe(401);      
    });
});