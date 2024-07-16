const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Month = sequelize.define('Month', {
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
    year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Year',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

module.exports = Month;
