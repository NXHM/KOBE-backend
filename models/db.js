const config = require('../config/db-config.js');
const { Sequelize, Op} = require('sequelize');
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

// Storing Models
const User = require('./User')(sequelize, Sequelize);
const Type = require('./Type')(sequelize, Sequelize);
const Month = require('./Month')(sequelize, Sequelize);
const Category = require('./Category')(sequelize, Sequelize);
const Movement = require('./Movement')(sequelize, Sequelize);
const Budget = require('./Budget')(sequelize, Sequelize);

const db = {
  Sequelize,
  Op,
  sequelize,
  connection,
  User,
  Type,
  Month,
  Category,
  Movement,
  Budget,
};


db.Category.hasMany(db.Movement);
db.Movement.belongsTo(db.Category);

db.User.hasMany(db.Movement);
db.Movement.belongsTo(db.User);

db.User.hasMany(db.Budget);
db.Budget.belongsTo(db.User);

db.Type.hasMany(db.Category);
db.Category.belongsTo(db.Type);


module.exports = db;
