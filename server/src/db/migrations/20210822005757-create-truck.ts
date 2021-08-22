import {
    QueryInterface
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable('trucks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              model: {
                type: Sequelize.STRING(50),
                allowNull: false
              },
              license_plate: {
                type: Sequelize.STRING(50),
                allowNull: false
              },
              current_km: {
                type: Sequelize.FLOAT,
                allowNull: false
              },
              maximum_load_kg: {
                type: Sequelize.FLOAT,
                allowNull: false
              },
              fuel_type: {
                type: Sequelize.STRING(50),
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
        return queryInterface.dropTable('Truck');
    }
};
