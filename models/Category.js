const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Type',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

module.exports = Category;
