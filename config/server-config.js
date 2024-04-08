const express = require('express');
const cors = require('cors');

const configuration = express.Router();

// Middleware en JSON
configuration.use(express.json());
// Permite analizar los datos de la URL
configuration.use(express.urlencoded({ extended: true }));

// Se añade el CORS
configuration.use(cors());
// Permite que cualquiera pueda hacer consulta
configuration.options('*', cors());

module.exports = configuration;