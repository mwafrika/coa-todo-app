import { StatusCodes } from "http-status-codes";
import { db } from "./config/db";
import { Todo } from "./database/models";
import { Sequelize } from "sequelize";

const showMessage = (req, res) =>
  res.status(StatusCodes.OK).send({
    message: "Welcome to the TODO API",
  });

const createTodo = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newTodo = await Todo.create({
      title,
      description,
      date,
    });

    return res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Todo created successfully",
      newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to create todo",
    });
  }
};

const getAllTodosPlusDeleted = async (req, res) => {
  const db = await Todo.findAll({});

  if (db.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "The todo you are looking for was not found" });
  }
  return res.status(StatusCodes.OK).send({
    status: "success",
    message: "Todos retrieved successfully",
    db,
  });
};

const getAllDeletedTodo = async (req, res) => {
  const db = await Todo.findAll({
    where: {
      deleted: true,
    },
  });

  if (db.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "The todo you are looking for was not found" });
  }
  return res.status(StatusCodes.OK).send({
    status: "success",
    message: "Todos retrieved successfully",
    db,
  });
};

const getAllTodos = async (req, res) => {
  const db = await Todo.findAll({
    where: {
      deleted: false,
    },
  });
  if (db.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "The todo you are looking for was not found" });
  }
  return res.status(StatusCodes.OK).send({
    status: "success",
    message: "Todos retrieved successfully",
    db,
  });
};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const singleTodo = await Todo.findOne({
      where: {
        id,
        deleted: false,
      },
    });
    if (!singleTodo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "The todo you are looking for was not found" });
    }
    return res.status(StatusCodes.OK).send({
      status: "success",
      message: "Todo retrieved successfully",
      singleTodo,
    });
  } catch (error) {
    console.error("Error getting todo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted, date } = req.body;

  try {
    const [updateCount] = await Todo.update(
      {
        title: title || Sequelize.literal('"title"'), // Ensure column name is enclosed in double quotes
        description: description || Sequelize.literal('"description"'),
        isCompleted: isCompleted || Sequelize.literal('"isCompleted"'), // Ensure column name matches the database
        date: date || Sequelize.literal('"date"'),
      },
      {
        where: {
          id,
          deleted: false,
        },
      }
    );

    if (updateCount === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "The todo you are looking for was not found",
      });
    }

    const updatedTodo = await Todo.findByPk(id);

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to update todo",
    });
  }
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted
  );

  if (todoIndex === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "The todo you are looking for was not found" });
  }

  db[todoIndex].deleted = true;

  return res
    .status(StatusCodes.OK)
    .send({ message: "Todo deleted successfully" });
};

const restoreDeletedTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && todo.deleted
  );

  if (todoIndex === -1) {
    return res.status(StatusCodes.NOT_FOUND).send({
      error: "The todo you are looking for was not found",
    });
  }

  db[todoIndex].deleted = false;

  return res.status(StatusCodes.OK).send({
    message: "Todo restored successfully",
  });
};

const markAsDone = (req, res) => {
  const { id } = req.params;

  const todoIndex = db.findIndex(
    (todo) => todo.id === parseInt(id, 10) && !todo.deleted
  );

  if (todoIndex === -1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "The todo you are looking for was not found" });
  }

  db[todoIndex].isCompleted = true;

  return res.status(StatusCodes.OK).send({
    status: "success",
    message: "Todo updated successfully",
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
