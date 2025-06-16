'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('ratings', 'recipes_rating_id', {
        type: Sequelize.INTEGER
    })

    await queryInterface.addColumn('ratings', 'user_rating_id', {
        type: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('ratings', 'recipes_rating_id')
    await queryInterface.removeColumn('ratings', 'user_rating_id')
  }
};
