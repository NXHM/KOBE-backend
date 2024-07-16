const express = require('express');
const serverConfig = require('./config/server-config');
const routes = require('./routes/routes');
const { sequelize } = require('./models'); // Importar la instancia de sequelize desde models.js

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
