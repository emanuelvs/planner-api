'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING(80),
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'now()'
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'now()'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
