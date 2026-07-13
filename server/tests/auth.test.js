const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const bcrypt = require("bcrypt");

describe("Authentication", () => {
  test("login should return Jwt", async () => {
    await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: await bcrypt.hash("Password123", 10),
      role: "ADMIN",
    });

    const response = await request(app).post("/auth/login").send({
      email: "admin@test.com",
      password: "Password123",
    });
    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.accessToken).toBeDefined();
  });
});
