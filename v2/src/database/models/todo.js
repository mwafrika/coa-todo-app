"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      isCompleted: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
      freezeTableName: true,
    }
  );
  return Todo;
};
