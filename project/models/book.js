'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    cover_image: DataTypes.STRING,
    author: DataTypes.STRING,
    status: DataTypes.ENUM('1','0')
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};