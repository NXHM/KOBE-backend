const Sequelize = require('sequelize');
const config = require('./config/db-config');

// Configuración de la db
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

//
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Storing Models
const Models = {};

module.exports = {db, sequelize};