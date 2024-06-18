// Configuración de la db
module.exports = {
  database: process.env.DB_DATABASE || 'kobe-budget-app',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};
