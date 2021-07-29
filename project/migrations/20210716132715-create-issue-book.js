'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('IssueBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "categories"
          },
          key:"id"
        },
        allowNull: false
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "books"
          },
          key:"id"
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "users"
          },
          key:"id"
        },
        allowNull: false
      },
      days_issued: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      issued_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      is_returned: {
        type: Sequelize.ENUM('1','0'),
        defaultValue: '0'
      },
      retured_date: {
        type: Sequelize.DATE,
        allowNull: true

      },
      status: {
        type: Sequelize.ENUM('1','0'),
        defaultValue: '1'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('IssueBooks');
  }
};