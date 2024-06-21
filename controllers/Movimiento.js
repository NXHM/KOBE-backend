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
  const getMovimiento = async (req, res) => {
    const { usuario_id } = req.params;  // Suponiendo que el usuario_id se pasa como parámetro en la URL

    const query = `
        SELECT m.date AS fecha, t.name AS tipo, cat.name AS categoria, m.detail AS comentario, m.amount AS monto 
        FROM public."Movement" m 
        INNER JOIN public."Category" cat ON m.category_id = cat.id 
        INNER JOIN public."Type" t ON cat.type_id = t.id
        WHERE m.user_id = $1;;
    `;

    const values = [usuario_id];

    try {
        console.log(connection.options);
        const response = await connection.query(query, values);
        res.status(200).json(response.rows);
        console.log("Movimientos obtenidos correctamente");
    } catch (error) {
        console.error('Error al obtener movimientos:', error);
        res.status(500).json({ error: 'Error al obtener movimientos' });
    }
};

const editarMovimiento = async (req, res) => {
  const { id } = req.params;
  const { fecha, tipo_id, categoria_id, monto, comentario } = req.body;

  const query = `
    UPDATE movimiento
    SET fecha = $1, tipo_id = $2, categoria_id = $3, monto = $4, comentario = $5
    WHERE id = $6
    RETURNING *;
  `;

  const values = [fecha, tipo_id, categoria_id, monto, comentario, id];

  try {
    const { rows } = await connection.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Movimiento actualizado correctamente', movimiento: rows[0] });
    console.log("Movimiento editado correctamente");
  } catch (error) {
    console.error('Error al editar movimiento:', error);
    res.status(500).json({ error: 'Hubo un problema al editar el movimiento' });
  }
};

const eliminarMovimiento = async (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM movimiento
    WHERE id = $1
    RETURNING *;
  `;

  const values = [id];

  try {
    const { rows } = await connection.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Movimiento eliminado correctamente', movimiento: rows[0] });
    console.log("Movimiento eliminado correctamente");
  } catch (error) {
    console.error('Error al eliminar movimiento:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el movimiento' });
  }
};

module.exports = {
    ingresarMovimiento,
    getMovimiento,
    editarMovimiento,
    eliminarMovimiento
};
