"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Todo", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   min: {
        //     args: 3,
        //     msg: "Title should have a minimum length of 3",
        //   },
        //   max: {
        //     args: 200,
        //     msg: "Title should have a maximum length of 200",
        //   },

        //   notEmpty: {
        //     args: true,
        //     msg: "Title cannot be empty",
        //   },

        //   notNull: {
        //     args: true,
        //     msg: "Title is a required field",
        //   },
        // },
      },
      description: {
        type: Sequelize.TEXT,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: Sequelize.DATE,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Todo");
  },
};
