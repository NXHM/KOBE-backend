require('dotenv').config(); // Cargar variables de entorno al inicio

const Sequelize = require('sequelize');
const { Pool } = require('pg');

const config = {
  database: 'kobe-budget-app',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
};

// Configuración de la db con Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// Conexión con pool usando pg
const connection = new Pool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'kobe-budget-app'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Storing Models
const Models = {};

module.exports = { db, sequelize, connection };
