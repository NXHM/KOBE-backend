const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tracker = sequelize.define('Tracker', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Calendar',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Type',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

module.exports = Tracker;
