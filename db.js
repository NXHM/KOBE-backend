const config = require('./config/db-config');
const Sequelize = require('sequelize');
const { Pool } = require('pg');

// Configuración de la db con Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Conexión con pool usando pg
const connection = new Pool({
  connectionLimit: 10,
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Storing Models
db.user = require('./models/User')(sequelize, Sequelize);

// Associations


module.exports = { db, sequelize, connection };
