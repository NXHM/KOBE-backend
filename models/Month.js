const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
    const Month = sequelize.define("Month",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        days: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        freezeTableName: true,
        timestamps: false,
    })
}