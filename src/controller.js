import { StatusCodes } from 'http-status-codes';
import { db } from './config/db';

const showMessage = (req, res) => res.status(StatusCodes.OK).send({
  message: 'Welcome to the TODO API',
});

const createTodo = (req, res) => {
  const { title, description, date } = req.body;

  const newTodo = {
    id: db.length + 1,
    title,
    description,
    isCompleted: false,
    date,
  };

  db.push(newTodo);
  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Todo created successfully',
    newTodo,
  });
};

const getAllTodos = (req, res) => {
  if (db.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todos retrieved successfully',
    db,
  });
};

const getSingleTodo = (req, res) => {
  const { id } = req.params;
  const singleTodo = db.find((todo) => todo.id === parseInt(id, 10));
  if (!singleTodo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todo retrieved successfully',
    singleTodo,
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const todoTobeUpdated = db.find((todo) => todo.id === parseInt(id, 10));
  if (!todoTobeUpdated) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  const updatedTodo = {
    id: todoTobeUpdated.id,
    title: title || todoTobeUpdated.title,
    description: description || todoTobeUpdated.description,
    isCompleted: isCompleted || todoTobeUpdated.isCompleted,
  };
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id, 10));
  db[todoIndex] = updatedTodo;
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todo updated successfully',
    updatedTodo,
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoToBeDeleted = db.find((todo) => todo.id === parseInt(id, 10));
  if (!todoToBeDeleted) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id, 10));
  db.splice(todoIndex, 1);
  return res
    .status(StatusCodes.OK)
    .send({ message: 'Todo deleted successfully' });
};

const markAsDone = (req, res) => {
  const { id } = req.params;
  const todoToBeDone = db.find((todo) => todo.id === parseInt(id, 10));
  if (!todoToBeDone) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  const updatedTodo = {
    id: todoToBeDone.id,
    title: todoToBeDone.title,
    description: todoToBeDone.description,
    isCompleted: true,
  };
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id, 10));
  db[todoIndex] = updatedTodo;
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todo updated successfully',
    updatedTodo,
  });
};

export {
  showMessage,
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  markAsDone,
};
