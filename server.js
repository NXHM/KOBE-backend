const express = require('express');
const serverConfig = require("./config/server-config");
const routes = require('../routes');

const server = () =>{
    const app = express();
    // Usa la configuración seteada en serverConfig
    app.use(serverConfig);
    // Usa las rutas definidas en la carpeta routes
    // y agrega el prefijo /api
    app.use("/api",routes);
    return app
};



module.exports = server;