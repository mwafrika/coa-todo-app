import request from "supertest";
import app from "../../index";

describe("GET TODOs", () => {
  test("Should show a welcome message", async () => {
    const response = await request(app).get("/").send({
      message: "Welcome to the TODO API",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Welcome to the TODO API");
  });

  test("Should create a new TODO", async () => {
    const response = await request(app).post("/todos").send({
      title: "Test",
      description: "Test",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test");
    expect(response.body.description).toBe("Test");
    expect(response.body.isCompleted).toBe(false);
  });
});
