const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Year = sequelize.define("Year",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })
};