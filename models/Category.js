const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define("Category",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        type_id: { // Campo de clave externa
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Type', // Nombre del modelo al que hace referencia
                key: 'id', // Nombre del campo de clave primaria en el modelo Type
            },
        },
    },{
        freezeTableName: true,
        timestamps: false,
    });

    Category.associate = (models) => {
        Category.hasMany(models.Budget, {
            foreignKey: 'category_id', // Nombre del campo de clave externa en Budget
        });
        Category.hasMany(models.Movement, {
            foreignKey: 'category_id', // Nombre del campo de clave externa en Movement
        });
    };

    return Category;
};