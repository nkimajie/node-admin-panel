'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssueBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  IssueBook.init({
    categoryId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    days_issued: DataTypes.INTEGER,
    issued_date: DataTypes.DATE,
    is_returned: DataTypes.ENUM('1','0'),
    retured_date: DataTypes.DATE,
    status: DataTypes.ENUM('1','0')
  }, {
    sequelize,
    modelName: 'IssueBook',
  });
  return IssueBook;
};