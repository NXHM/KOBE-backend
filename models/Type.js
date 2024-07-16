const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Type = sequelize.define('Type', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Type;
