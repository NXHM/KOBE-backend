const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
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
        underscored: true,
    });

    return User;
}
