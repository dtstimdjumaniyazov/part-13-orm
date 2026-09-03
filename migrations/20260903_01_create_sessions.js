const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('sessions');
    }
};
