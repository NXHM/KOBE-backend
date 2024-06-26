const app = require('./config/server-config');
const db = require('./models/db');
const router = require('./routes/routes');
const port = 3000;

// Con force: true se elimina la db y las tablas, se crae toda la base de datos de nuevo
db.sequelize.sync({ force: false}) 
  .then(() => {
    // Crear tablas si no existen
    console.log('Database & tables created!');
});

// Escucha en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

// Usa las rutas definidas en la carpeta routes
// y agrega el prefijo /api
app.use("/api", router);
