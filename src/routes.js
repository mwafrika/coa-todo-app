import { Router } from 'express';
import {
  showMessage,
  getAllTodos,
  getSingleTodo,
  createTodo,
  deleteTodo,
  markAsDone,
  updateTodo,
} from './controller';

import { validateData, validateID } from './middleware/inputValidation';

const router = Router()
  .get('/', showMessage)
  .post('/todos', validateData, createTodo)
  .get('/todos', getAllTodos)
  .get('/todos/:id', validateID, getSingleTodo)
  .patch('/todos/:id', validateID, validateData, updateTodo)
  .delete('/todos/:id', validateID, deleteTodo)
  .patch('/todos/:id/done', validateID, markAsDone);

export default router;
