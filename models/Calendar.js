const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Calendar = sequelize.define("Calendar",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        month_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Month', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo Month
            },
        },
        year_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Year', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo Year
            },
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });

    Calendar.associate = (models) => {
        Calendar.hasMany(models.Movement, {
            foreignKey: 'calendar_id', // Nombre del campo de clave externa en Movement
        });
    };

    return Calendar;
};