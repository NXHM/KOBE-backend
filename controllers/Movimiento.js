const { connection } = require("../models/db");
const db = require("../models/db");

const Sequelize = db.Sequelize;
const Op = db.Op;
const Movement = db.Movement;

const ingresarMovimiento = async (req, res) => {
    const { fecha, tipo_id, categoria_id, monto, comentario, usuario_id } =
        req.body;

    const query = `
      INSERT INTO movimiento (fecha, tipo_id, categoria_id, monto, comentario, usuario_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
        fecha,
        tipo_id,
        categoria_id,
        monto,
        comentario,
        usuario_id,
    ];

    try {
        const { rows } = await connection.query(query, values);
        res.status(201).json({
            mensaje: "Movimiento creado correctamente",
            movimiento: rows[0],
        });
        console.log("Se ingreso movimiento");
    } catch (error) {
        console.error("Error al crear movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al crear el movimiento",
        });
    }
};

const getMovimientos = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            include: [{ model: db.Category }],
        });

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const getMontoPorCategoriaMovimiento = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            attributes: [
                "category_id",
                [Sequelize.col("Category.name"), "category_name"],
                [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            include: [{ model: db.Category, attributes: [] }],
            group: ["category_id", "Category.name"],
        });

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const getMontoPorTipoMovimiento = async (req, res) => {
    const { user_id, year, month } = req.body;

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const movimientos = await Movement.findAll({
            attributes: [
                [Sequelize.col("Category.type_id"), "type_id"],
                [Sequelize.col("Category.Type.name"), "type_name"],
                [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
            ],
            where: {
                user_id: {
                    [Op.eq]: user_id,
                },
                date: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                },
            },
            include: [
                {
                    model: db.Category,
                    attributes: [],
                    include: [{ model: db.Type, attributes: [] }],
                },
            ],
            group: ["Category.type_id", "Category.Type.name"],
        });

        if (movimientos) {
            res.send(movimientos);
        } else {
            res.status(404).json({ message: "No existen movimientos." });
        }
    } catch (error) {
        console.error("Error al buscar movimientos: ", error);
        res.status(500).json({ error: "Error al buscar movimientos." });
    }
};

const editarMovimiento = async (req, res) => {
    const { id } = req.params;
    const { date, category_id, amount, detail } = req.body;

    const query = `
    UPDATE public."Movement"
    SET date = $1, category_id = $2, amount = $3, detail = $4
    WHERE id = $5
    RETURNING *;
  `;

    const values = [date, category_id, amount, detail, id];

    try {
        const { rows } = await connection.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        res.status(200).json({
            mensaje: "Movimiento actualizado correctamente",
            movimiento: rows[0],
        });
        console.log("Movimiento editado correctamente");
    } catch (error) {
        console.error("Error al editar movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al editar el movimiento",
        });
    }
};

const eliminarMovimiento = async (req, res) => {
    const { id } = req.params;

    const query = `
    DELETE FROM public."Movement"
    WHERE id = $1
    RETURNING *;
  `;

    const values = [id];

    try {
        const { rows } = await connection.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        res.status(200).json({
            mensaje: "Movimiento eliminado correctamente",
            movimiento: rows[0],
        });
        console.log("Movimiento eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar movimiento:", error);
        res.status(500).json({
            error: "Hubo un problema al eliminar el movimiento",
        });
    }
};

module.exports = {
    ingresarMovimiento,
    getMovimientos,
    getMontoPorCategoriaMovimiento,
    getMontoPorTipoMovimiento,
    editarMovimiento,
    eliminarMovimiento,
};
