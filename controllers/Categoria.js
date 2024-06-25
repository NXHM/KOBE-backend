const { connection } = require('../models/db');

const getCategoria = async (req, res) => {
    try {
        console.log(connection.options)
        const response = await connection.query('SELECT * FROM Categoria;');
        res.status(200).json(response.rows);
        console.log("Se imprimieron categorias")
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

module.exports = {
    getCategoria,
};
