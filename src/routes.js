import { Router } from "express";
import {
  showMessage,
  getAllTodos,
  getSingleTodo,
  createTodo,
  deleteTodo,
  markAsDone,
  updateTodo,
} from "./controller.js";
const router = Router()
  .get("/", showMessage)
  .post("/todos", createTodo)
  .get("/todos", getAllTodos)
  .get("/todos/:id", getSingleTodo)
  .patch("/todos/:id", updateTodo)
  .delete("/todos/:id", deleteTodo)
  .patch("/todos/:id/done", markAsDone);

export default router;
