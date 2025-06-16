'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Rating.belongsTo(models.Users, {
        as: 'user_rating',
        foreignKey: 'user_rating_id', // fk's rating table
        sourceKey: 'id', // pk's rating table
      });

      models.Rating.belongsTo(models.Recipes, {
        as: 'recipes_rating',
        foreignKey: 'recipes_rating_id', // fk's rating table
        sourceKey: 'id', // pk's rating table
      });

    }
  }
  Rating.init({
    rated_score: DataTypes.INTEGER,
    rated_comment: DataTypes.TEXT('long'),
    user_rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id' // id คือ pk ของตาราง users
      }
    },
    recipes_rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'recipes'
        },
        key: 'id' // id คือ pk ของตาราง recipes
      }
    },
  }, {
    sequelize,
    modelName: 'Rating',
    underscored: true,
  });
  return Rating;
};