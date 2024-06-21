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

    Month.associate = (models) => {
        Month.hasMany(models.Calendar, {
            foreignKey: 'month_id', // Nombre del campo de clave externa en Calendar
        });
        Month.hasMany(models.Budget, {
            foreignKey: 'month_id', // Nombre del campo de clave externa en Budget
        });
    };

    return Month;
}