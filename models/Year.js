const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Year = sequelize.define('Year', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Year;
