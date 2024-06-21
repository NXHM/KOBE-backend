const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

module.exports = (sequelize) => {
    const Tracker = sequelize.define('Tracker', {
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        detail: {
            type: DataTypes.VARCHAR(50),
            allowNull: false
        }
    });
}