import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";

import app from "../../../app.js";
import { User } from "../../user/model/user.model.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/v1/auth/login", () => {
  const password = "Password@123";

  const createTestUser = async (overrides = {}) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
      isActive: true,
      phone: "123456789",
      ...overrides,
    });
  };

  it("should login with valid credentials", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
        password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data.user).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
      })
    );

    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.refreshToken).toBeDefined();

    expect(response.body.data.user.password).toBeUndefined();
  });

  it("should reject an incorrect password", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
        password: "WrongPassword",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(AUTH_ERROR.INVALID_EMAIL_OR_PASSWORD);
  });

  it("should reject an email that does not exist", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "missing@example.com",
        password,
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(AUTH_ERROR.INVALID_EMAIL_OR_PASSWORD);
  });

  it("should reject an inactive user", async () => {
    await createTestUser({
      isActive: false,
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
        password,
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe(
      AUTH_ERROR.ACCOUNT_NOT_ACTIVE
    );
  });

  it("should normalize the email before login", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "  TEST@EXAMPLE.COM  ",
        password,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should reject a request without an email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        password,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should reject a request without a password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});