import { Router } from "express";
import {
  showMessage,
  getAllTodos,
  getSingleTodo,
  createTodo,
  deleteTodo,
  markAsDone,
  updateTodo,
} from "./controller";

import ValidateInput from "./middleware/inputValidation";

const router = Router()
  .get("/", showMessage)
  .post("/todos", ValidateInput, createTodo)
  .get("/todos", getAllTodos)
  .get("/todos/:id", getSingleTodo)
  .patch("/todos/:id", ValidateInput, updateTodo)
  .delete("/todos/:id", deleteTodo)
  .patch("/todos/:id/done", markAsDone);

export default router;
