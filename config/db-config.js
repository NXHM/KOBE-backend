require('dotenv').config();
// Configuración de la db
module.exports = {
  database:  'kobe-budget-app',
  username: 'postgres',
  password:  'postgres',// process.env.DB_PASSWORD// Para los demás es postgres
  host: 'localhost',
  dialect: 'postgres',
};
