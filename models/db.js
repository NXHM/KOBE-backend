const config = require('../config/db-config.js');
const { Sequelize, Op} = require('sequelize');
const { Pool } = require('pg');

// Configuración de la db con Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: (msg) => console.log(msg),
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
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Type = require('./Type')(sequelize, Sequelize.DataTypes);
const Month = require('./Month')(sequelize, Sequelize.DataTypes);
const Category = require('./Category')(sequelize, Sequelize.DataTypes);
const Movement = require('./Movement')(sequelize, Sequelize.DataTypes);
const Budget = require('./Budget')(sequelize, Sequelize.DataTypes);

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

db.Type.hasMany(db.Category);
db.Category.belongsTo(db.Type);

db.Category.hasMany(db.Movement);
db.Movement.belongsTo(db.Category);

db.User.hasMany(db.Movement);
db.Movement.belongsTo(db.User);

db.User.hasMany(db.Category);
db.Movement.belongsTo(db.User);

db.User.hasMany(db.Budget);
db.Budget.belongsTo(db.User);

db.Category.hasMany(db.Budget);
db.Budget.belongsTo(db.Category);

db.Month.hasMany(db.Budget);
db.Budget.belongsTo(db.Month);


module.exports = db;
