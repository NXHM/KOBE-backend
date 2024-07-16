const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Calendar = sequelize.define('Calendar', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    month_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Month',
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

module.exports = Calendar;
