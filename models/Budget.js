const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Budget = sequelize.define("Budget",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Category', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        user_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        month_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Month', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        year_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Year', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });
};