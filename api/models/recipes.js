'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Recipes.belongsTo(models.Users, {
        as: 'user',
        foreignKey: 'user_id', // fk's recipes table
        sourceKey: 'id', // pk's recipes table
      });

      models.Recipes.hasMany(models.Rating, {
        as: 'rating',
        foreignKey: 'recipes_rating_id', // fk's rating table
        sourceKey: 'id', // pk's recipes table
      });

    }
  }
  Recipes.init({
    name_of_menu: DataTypes.STRING,
    picture_of_menu: DataTypes.STRING,
    material_of_menu: DataTypes.TEXT('long'),
    menu_structure: DataTypes.TEXT('long'),
    menu_duration: DataTypes.STRING,
    menu_level_of_difficulty: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id' // id คือ pk ของตาราง users
      }
    },
  }, {
    sequelize,
    modelName: 'Recipes',
    underscored: true,
  });
  return Recipes;
};