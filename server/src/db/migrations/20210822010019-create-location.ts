import {
    QueryInterface
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable('locations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              truckId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'trucks',
                  key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
              },
              latitude:{
                type: Sequelize.FLOAT,
                allowNull: false
              },
              longitude:{
                type: Sequelize.FLOAT,
                allowNull: false
              },
              date_and_time:{
                type: Sequelize.DATE,
                allowNull: false
              },
              created_at: {
                type: Sequelize.DATE,
                allowNull: false
              },
              updated_at: {
                type: Sequelize.DATE,
                allowNull: false
              }
        });
    },

    down: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.dropTable('locations');
    }
};
