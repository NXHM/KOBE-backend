const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

// El Id se coloca automaticamente
const User = sequelize.define('User', {
    name: { // nombre completo de la persona
        type: DataTypes.STRING,
        allowNull: false
    }, // Nombre del usuario
    username:{
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
},{
        freezeTableName: true
    
});
module.exports = User;