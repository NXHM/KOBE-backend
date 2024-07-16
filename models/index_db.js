const { Sequelize, DataTypes, Op } = require('sequelize');
const config = require('../config/db-config');

// Configuración de la base de datos
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

// Almacenar Modelos
db.User = require('./User')(sequelize, DataTypes);
db.Type = require('./Type')(sequelize, DataTypes);
db.Category = require('./Category')(sequelize, DataTypes);
db.Calendar = require('./Calendar')(sequelize, DataTypes);
db.Month = require('./Month')(sequelize, DataTypes);
db.Year = require('./Year')(sequelize, DataTypes);
db.Tracker = require('./Tracker')(sequelize, DataTypes);

// Definir relaciones
db.Category.belongsTo(db.Type, { foreignKey: 'type_id' });
db.Month.belongsTo(db.Year, { foreignKey: 'year_id' });
db.Calendar.belongsTo(db.Month, { foreignKey: 'month_id' });
db.Tracker.belongsTo(db.User, { foreignKey: 'user_id' });
db.Tracker.belongsTo(db.Calendar, { foreignKey: 'date_id' });
db.Tracker.belongsTo(db.Type, { foreignKey: 'type_id' });
db.Tracker.belongsTo(db.Category, { foreignKey: 'category_id' });

module.exports = db;

