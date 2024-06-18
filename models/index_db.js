const {Sequelize, DataTypes, Op} = require('sequelize');
const config = require('./config/db-config');

// Configuration db
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});
  
  
const db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;


// Storing Models
db.user = require('./User')(sequelize, Sequelize, DataTypes);

// Associations

<<<<<<< HEAD
module.exports = db;
=======
module.exports = db;
>>>>>>> 389509bf25c67cf1054e5e4fc281019f12ef38aa
