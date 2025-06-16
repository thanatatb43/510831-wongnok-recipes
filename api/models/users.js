'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Recipes, {
        as: 'recipes',
        foreignKey: 'user_id', // fk's recipes table
        sourceKey: 'id', // pk's users table
      });

      models.Users.hasMany(models.Rating, {
        as: 'rating',
        foreignKey: 'user_rating_id', // fk's rating table
        sourceKey: 'id', // pk's users table
      });

    }
  }
  Users.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};