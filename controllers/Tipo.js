const { connection } = require('../db');

const getTipo = async (req, res) => {
    try {
        console.log(connection.options)
        const response = await connection.query('SELECT * FROM Tipo;');
        res.status(200).json(response.rows);
        console.log("Se imprimieron tipos")
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

module.exports = {
    getTipo,
};
