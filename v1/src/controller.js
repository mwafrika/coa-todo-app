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
    deleted: false,
  };

  db.push(newTodo);
  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Todo created successfully',
    newTodo,
  });
};

const getAllTodosPlusDeleted = (req, res) => {
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

const getAllDeletedTodo = (req, res) => {
  if (db.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todos retrieved successfully',
    db: db.filter((todo) => todo.deleted === true),
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
    db: db.filter((todo) => todo.deleted === false),
  });
};

const getSingleTodo = (req, res) => {
  const { id } = req.params;
  const singleTodo = db.find(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted,
  );
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
  const {
    title, description, isCompleted, date,
  } = req.body;
  const todoTobeUpdated = db.find(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted,
  );
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
    date: date || todoTobeUpdated.date,
  };
  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted,
  );
  db[todoIndex] = updatedTodo;
  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todo updated successfully',
    updatedTodo,
  });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted,
  );

  if (todoIndex === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }

  db[todoIndex].deleted = true;

  return res
    .status(StatusCodes.OK)
    .send({ message: 'Todo deleted successfully' });
};

const restoreDeletedTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && todo.deleted,
  );

  if (todoIndex === -1) {
    return res.status(StatusCodes.NOT_FOUND).send({
      error: 'The todo you are looking for was not found',
    });
  }

  db[todoIndex].deleted = false;

  return res.status(StatusCodes.OK).send({
    message: 'Todo restored successfully',
  });
};

const markAsDone = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted,
  );

  if (todoIndex === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: 'The todo you are looking for was not found' });
  }

  db[todoIndex].isCompleted = true;

  return res.status(StatusCodes.OK).send({
    status: 'success',
    message: 'Todo updated successfully',
    updatedTodo: db[todoIndex],
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
  getAllTodosPlusDeleted,
  getAllDeletedTodo,
  restoreDeletedTodo,
};
