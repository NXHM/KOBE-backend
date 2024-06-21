const express = require('express');
const cors = require('cors');

const app = express();

// Middleware en JSON
app.use(express.json());
// Permite analizar los datos de la URL
app.use(express.urlencoded({ extended: true }));

// Se añade el CORS
app.use(cors());
// Permite que cualquiera pueda hacer consulta
app.options('*', cors());

module.exports = app;