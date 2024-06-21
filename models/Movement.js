const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Movement = sequelize.define("Movement",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        detail:{
            type: "varchar(50)",
            allowNull: false
        },
        user_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        category_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Category', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        date_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Calendar', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo
            },
        },
        
    },{
        freezeTableName: true,
        timestamps: false,
    });
};