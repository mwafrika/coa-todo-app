import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { db } from "../config/db";
import app from "../../index";

describe("GET TODOs", () => {
  test("Should show a welcome message", async () => {
    const response = await request(app).get("/api/v1").send({
      message: "Welcome to the TODO API",
    });
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.message).toBe("Welcome to the TODO API");
  });

  describe("POST TODO", () => {
    test("Should create a new TODO", async () => {
      const newTodo = {
        id: db.length + 1,
        title: "Test",
        description: "Test",
        isCompleted: false,
      };

      db.push(newTodo);
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe("Test");
      expect(response.body.description).toBe("Test");
      expect(response.body.isCompleted).toBe(false);
    });

    test("Should not create a new TODO if the title is missing", async () => {
      const newTodo = {
        title: "",
        description: "Test",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Title and description are required");
    });

    test("Should not create a new TODO if the description is missing", async () => {
      const newTodo = {
        title: "Test",
        description: "",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe("Title and description are required");
    });
  });

  describe("GET TODO By ID", () => {
    it("should get a todo by id", async () => {
      const response = await request(app).get(`/api/v1/todos/${1}`);
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(1);
    });

    it("should return a message if there is no todo with the given id", async () => {
      const response = await request(app).get("/api/v1/todos/100");
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe("No todo found");
    });
  });

  describe("UPDATE TODO", () => {
    it("should update a todo", async () => {
      const response = await request(app).patch(`/api/v1/todos/${1}`).send({
        title: "Test updated",
        description: "Test",
        isCompleted: true,
      });
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.title).toBe("Test updated");
      expect(response.body.description).toBe("Test");
      expect(response.body.isCompleted).toBe(true);
    });

    it("should send an 404 message if the todo to be updated was not found", async () => {
      const response = await request(app)
        .patch(`/api/v1/todos/1111111111`)
        .send({
          title: "Test updated",
          description: "Test",
          isCompleted: true,
        });
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe("No todo found");
    });

    it("should not update a todo if the title is missing", async () => {});
  });

  describe("DELETE TODO", () => {
    it("should delete a todo", async () => {
      const response = await request(app).delete(`/api/v1/todos/${1}`);
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.message).toBe("Todo deleted successfully");
    });

    it("should send an 404 message if the todo to be deleted was not found", async () => {
      const response = await request(app).delete(`/api/v1/todos/1111111111`);
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe("No todo found");
    });
  });

  describe("MARK TODO AS DONE", () => {
    it("should mark a todo as done", async () => {
      const response = await request(app).patch(`/api/v1/todos/${2}/done`);
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.isCompleted).toBe(true);
    });

    it("should send an 404 message if the todo to be marked as done was not found", async () => {
      const response = await request(app).patch(
        `/api/v1/todos/1111111111/done`
      );
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe("No todo found");
    });
  });

  describe("GET TODOs", () => {
    it("should get all todos", async () => {
      const response = await request(app).get("/api/v1/todos");
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toStrictEqual(db);
    });

    it("should return a message if there is no todos", async () => {
      db.length = 0;
      const response = await request(app).get("/api/v1/todos");
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe("No todo found");
    });
  });
});
