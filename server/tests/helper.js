const User = require("../models/User");
const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../app");

const createAdminAndLogin = async () => {
  const password = await bcrypt.hash("Password123", 10);

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password,
    role: "ADMIN",
  });

  const response = await request(app).post("/auth/login").send({
    email: "admin@test.com",
    password: "Password123",
  });

  return response.body.accessToken;
};

module.exports = {
  createAdminAndLogin,
};
