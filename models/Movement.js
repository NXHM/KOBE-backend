const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Movement = sequelize.define(
        'Movement',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            detail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    return Movement;
};
