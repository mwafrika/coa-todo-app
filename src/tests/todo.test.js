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
        date: "2024-02-20",
      };

      db.push(newTodo);
      const response = await request(app).post("/api/v1/todos").send(newTodo);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Todo created successfully");
      expect(response.body.newTodo.title).toBe("Test");
      expect(response.body.newTodo.description).toBe("Test");
      expect(response.body.newTodo.isCompleted).toBe(false);
      expect(response.body.newTodo.date).toBe("2024-02-20");
    });

    test("Should not create a new TODO if the title is missing", async () => {
      const newTodo = {
        title: "",
        description: "Test",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Title cannot be empty");
    });

    test("Should not create a new TODO if the description is missing", async () => {
      const newTodo = {
        title: "Test",
        description: "",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Description cannot be empty");
    });

    test("Should not create a new TODO if the title is not a string", async () => {
      const newTodo = {
        title: null,
        description: "Test",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Title should be a string");
    });
    test("Should not create a new TODO if the description is not a string", async () => {
      const newTodo = {
        title: "Test",
        description: null,
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Description should be a string");
    });

    test("Should not create a new TODO if the title is less than 3 characters", async () => {
      const newTodo = {
        title: "Te",
        description: "Test",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe(
        "Title should have a minimum length of 3"
      );
    });

    test("Should not create a new TODO if the description is less than 3 characters", async () => {
      const newTodo = {
        title: "Test",
        description: "Te",
        isCompleted: false,
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe(
        "Description should have a minimum length of 3"
      );
    });

    test("Should not create a new todo if the date is in the past", async () => {
      const newTodo = {
        title: "Test",
        description: "Test",
        isCompleted: false,
        date: "2020-02-03",
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Date cannot be in the past");
    });

    test("Should not create a new todo if the date is missing", async () => {
      const newTodo = {
        title: "Test",
        description: "Test",
        isCompleted: false,
        date: "",
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Date is a required field");
    });

    test("Should not create a new todo if the date is not in the correct format", async () => {
      const newTodo = {
        title: "Test",
        description: "Test",
        isCompleted: false,
        date: "hidhidhiehdjijed",
      };
      const response = await request(app).post("/api/v1/todos").send(newTodo);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Invalid date format");
    });
  });

  describe("GET TODO By ID", () => {
    it("should get a todo by id", async () => {
      const response = await request(app).get(`/api/v1/todos/${1}`);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.singleTodo.id).toBe(1);
    });

    it("should return a message if there is no todo with the given id", async () => {
      const response = await request(app).get("/api/v1/todos/100");
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe(
        "The todo you are looking for was not found"
      );
    });

    it("should return a message if the id is not a number", async () => {
      const response = await request(app).get("/api/v1/todos/abc");
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Id should be a number");
    });
  });

  describe("UPDATE TODO", () => {
    it("should update a todo", async () => {
      const response = await request(app).patch(`/api/v1/todos/${1}`).send({
        title: "Test updated",
        description: "Test",
        isCompleted: true,
        date: "2024-02-20",
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.updatedTodo.title).toBe("Test updated");
      expect(response.body.updatedTodo.description).toBe("Test");
      expect(response.body.updatedTodo.isCompleted).toBe(true);
    });

    it("should send an 404 message if the todo to be updated was not found", async () => {
      const response = await request(app)
        .patch(`/api/v1/todos/1111111111`)
        .send({
          title: "Test updated",
          description: "Test",
          isCompleted: true,
          date: "2024-02-20",
        });

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe(
        "The todo you are looking for was not found"
      );
    });

    it("should not update a todo if the title is missing", async () => {
      const response = await request(app).patch(`/api/v1/todos/${1}`).send({
        title: "",
        description: "Test",
        isCompleted: true,
        date: "2024-02-20",
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Title cannot be empty");
    });

    it("should not update a todo if the description is missing", async () => {
      const response = await request(app).patch(`/api/v1/todos/${1}`).send({
        title: "Test",
        description: "",
        isCompleted: true,
        date: "2024-02-20",
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Description cannot be empty");
    });

    it("should not update a todo if the is id is not a number", async () => {
      const response = await request(app).patch(`/api/v1/todos/abc`).send({
        title: "Test",
        description: "Test",
        isCompleted: true,
        date: "2024-02-20",
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Id should be a number");
    });
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
      expect(response.body.error).toBe(
        "The todo you are looking for was not found"
      );
    });

    it("should send an 400 message if the id is not a number", async () => {
      const response = await request(app).delete(`/api/v1/todos/abc`);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Id should be a number");
    });
  });

  describe("MARK TODO AS DONE", () => {
    it("should mark a todo as done", async () => {
      const response = await request(app).patch(`/api/v1/todos/${2}/done`);
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.updatedTodo.isCompleted).toBe(true);
    });

    it("should send an 404 message if the todo to be marked as done was not found", async () => {
      const response = await request(app).patch(
        `/api/v1/todos/1111111111/done`
      );
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe(
        "The todo you are looking for was not found"
      );
    });

    it("should send an 400 message if the id is not a number", async () => {
      const response = await request(app).patch(`/api/v1/todos/abc/done`);
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe("Id should be a number");
    });
  });

  describe("GET TODOs", () => {
    it("should get all todos", async () => {
      const response = await request(app).get("/api/v1/todos");
      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body.db).toStrictEqual(db);
    });

    it("should return a message if there is no todos", async () => {
      db.length = 0;
      const response = await request(app).get("/api/v1/todos");
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe(
        "The todo you are looking for was not found"
      );
    });
  });
});
