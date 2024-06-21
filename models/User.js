const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // El Id se coloca automaticamente
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: { // nombre completo de la persona
            type: DataTypes.STRING,
            allowNull: false
        }, // Nombre del usuario
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: { //email
            type: DataTypes.STRING,
            allowNull: false
        },
        password: { //contraseña
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    User.associate = (models) => {
        User.hasMany(models.Budget, {
            foreignKey: 'user_id', // Nombre del campo de clave externa en Budget
        });
        User.hasMany(models.Movement, {
            foreignKey: 'user_id', // Nombre del campo de clave externa en Movement
        });
    };

    return User;
}
