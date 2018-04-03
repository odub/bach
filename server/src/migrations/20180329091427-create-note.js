'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      index: {
        type: Sequelize.INTEGER,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      offset: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      measure: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      part: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notes');
  },
};
