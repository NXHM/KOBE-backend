const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware en JSON
app.use(express.json());
// Permite analizar los datos de la URL
app.use(express.urlencoded({ extended: true }));

// Se añade el CORS
app.use(cors('*'));
// Permite que cualquiera pueda hacer consulta
app.options('*', cors());

app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    try {
        const data = jwt.verify(token, 'SuperSecretPassword');
        req.session.user = data;
    } catch {}

    next();
});

module.exports = app;