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

    Year.associate = (models) => {
        Year.hasMany(models.Calendar, {
            foreignKey: 'year_id', // Nombre del campo de clave externa en Calendar
        });
        Year.hasMany(models.Budget, {
            foreignKey: 'month_id', // Nombre del campo de clave externa en Budget
        });
    };

    return Year;
};