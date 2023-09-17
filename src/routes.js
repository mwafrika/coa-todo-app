import { Router } from "express";
import {
  showMessage,
  getAllTodos,
  getSingleTodo,
  createTodo,
  deleteTodo,
  markAsDone,
  updateTodo,
  getAllTodosPlusDeleted,
  getAllDeletedTodo,
  restoreDeletedTodo,
} from "./controller";

import { validateData, validateID } from "./middleware/inputValidation";

const router = Router()
  .get("/", showMessage)
  .post("/todos", validateData, createTodo)
  .get("/todos", getAllTodos)
  .get("/todos/all", getAllTodosPlusDeleted)
  .get("/todos/deleted", getAllDeletedTodo)
  .patch("/todos/:id/restore", validateID, restoreDeletedTodo)
  .get("/todos/:id", validateID, getSingleTodo)
  .patch("/todos/:id", validateID, updateTodo)
  .delete("/todos/:id", validateID, deleteTodo)
  .patch("/todos/:id/done", validateID, markAsDone);

export default router;
