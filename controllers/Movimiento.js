const { connection } = require('../db');

const ingresarMovimiento = async (req, res) => {
    const { fecha, tipo_id, categoria_id, monto, comentario, usuario_id } = req.body;
  
    const query = `
      INSERT INTO movimiento (fecha, tipo_id, categoria_id, monto, comentario, usuario_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [fecha, tipo_id, categoria_id, monto, comentario, usuario_id];
  
    try {
      const { rows } = await connection.query(query, values);
      res.status(201).json({ mensaje: 'Movimiento creado correctamente', movimiento: rows[0] });
      console.log("Se ingreso movimiento")
    } catch (error) {
      console.error('Error al crear movimiento:', error);
      res.status(500).json({ error: 'Hubo un problema al crear el movimiento' });
    }
  };

module.exports = {
    ingresarMovimiento,
};
