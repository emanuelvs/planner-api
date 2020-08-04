'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      author_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          }
      },
      title: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      notify: {
          type: Sequelize.BOOLEAN,
          allowNull: true
      },
      left_time: {
          type: Sequelize.DATE,
          allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plan');
  }
};
