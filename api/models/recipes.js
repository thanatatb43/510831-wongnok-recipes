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
    }
  }
  Recipes.init({
    name_of_menu: DataTypes.STRING,
    picture_of_menu: DataTypes.STRING,
    material_of_menu: DataTypes.STRING,
    menu_structure: DataTypes.STRING,
    menu_duration: DataTypes.STRING,
    menu_level_of_difficulty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipes',
    underscored: true,
  });
  return Recipes;
};