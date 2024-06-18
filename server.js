const express = require('express');
<<<<<<< HEAD
const serverConfig = require("./config/server-config");
const routes = require('../routes');
const app = express();
const db = require('./models/index_db')

// Con force: true se elimina la db y las tablas, se crae toda la base de datos de nuevo
db.sequelize.sync({ force: true }) 
  .then(() => {
    // Crear tablas si no existen
    console.log('Database & tables created!');
  });

// Escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Usa la configuración seteada en serverConfig
app.use(serverConfig);
// Usa las rutas definidas en la carpeta routes
// y agrega el prefijo /api
app.use("/api",routes);

=======
const serverConfig = require('./config/server-config');
const routes = require('./routes/routes');

//Cargar variables de entorno
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

const server = () => {
    const app = express();
    // Usa la configuración seteada en serverConfig
    app.use(serverConfig);
    // Usa las rutas definidas en la carpeta routes
    // y agrega el prefijo /api
    app.use("/api", routes);
    return app;
};

const app = server();
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

module.exports = server;
>>>>>>> 389509bf25c67cf1054e5e4fc281019f12ef38aa
