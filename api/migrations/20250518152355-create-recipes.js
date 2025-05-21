'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_of_menu: {
        type: Sequelize.STRING
      },
      picture_of_menu: {
        type: Sequelize.STRING
      },
      material_of_menu: {
        type: Sequelize.STRING
      },
      menu_structure: {
        type: Sequelize.STRING
      },
      menu_duration: {
        type: Sequelize.STRING
      },
      menu_level_of_difficulty: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};