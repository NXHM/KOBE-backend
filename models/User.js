const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

// El Id se coloca automaticamente
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
        freezeTableName: true
    
});
module.exports = User;