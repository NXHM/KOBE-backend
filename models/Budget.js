const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Category',
                key: 'id'
            }
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

    return Budget;
};
