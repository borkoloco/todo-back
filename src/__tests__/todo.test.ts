import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../index";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
  await mongoServer.stop();
});

jest.mock(
  "../middleware/authMiddleware",
  () => (_req: any, _res: any, next: any) => {
    _req.userId = "mock-user-id";
    next();
  }
);

describe("Todo API", () => {
  it("should create a new Todo task", async () => {
    const newTodo = {
      title: "Test Task",
      status: false,
    };

    const response = await request(app)
      .post("/api/todos")
      .send(newTodo)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title", newTodo.title);
    expect(response.body).toHaveProperty("status", newTodo.status);
  });
});
