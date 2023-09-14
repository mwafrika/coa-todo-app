import { db } from "./config/db";

const showMessage = (req, res) => {
  return res.status(200).send({
    message: "Welcome to the TODO API",
  });
};

const createTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send({
      message: "Title and description are required",
    });
  }

  const newTodo = {
    id: db.length + 1,
    title,
    description,
    isCompleted: false,
  };
  db.push(newTodo);
  return res.status(201).send(newTodo);
};

const getAllTodos = (req, res) => {
  if (db.length === 0) {
    return res.status(404).send({ message: "No todo found" });
  }
  return res.status(200).send(db);
};

const getSingleTodo = (req, res) => {
  const { id } = req.params;
  const todo = db.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "No todo found" });
  }
  return res.status(200).send(todo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const todo = db.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "No todo found" });
  }
  const updatedTodo = {
    id: todo.id,
    title: title || todo.title,
    description: description || todo.description,
    isCompleted: isCompleted || todo.isCompleted,
  };
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id));
  db[todoIndex] = updatedTodo;
  return res.status(200).send(updatedTodo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todo = db.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "No todo found" });
  }
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id));
  db.splice(todoIndex, 1);
  return res.status(200).send({ message: "Todo deleted successfully" });
};

const markAsDone = (req, res) => {
  const { id } = req.params;
  const todo = db.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).send({ message: "No todo found" });
  }
  const updatedTodo = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    isCompleted: true,
  };
  const todoIndex = db.findIndex((todo) => todo.id === parseInt(id));
  db[todoIndex] = updatedTodo;
  return res.status(200).send(updatedTodo);
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
